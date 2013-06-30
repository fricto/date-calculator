DateCalculator = function (start, end) {

  // TKTKTK: offsetWorkDays, end dates after start dates
   
  var millisecondsPerDay = 1000*60*60*24,
      today, startDate, endDate, offsetDays, offsetWeekDays, offsetWorkDays, offsetWeeks, offsetMonths, offsetYears, offsetSummary, durationObject
      dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  var holidayFinder = new USFederalHolidayCalculator();
  
  var serialComma = function (str) {
    return (str == "") ? str : str+", ";
  }
  
  var pluralize = function (int) {
    return (int>1) ? "s" : "";
  }

  var module = {
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    // GETTERS & SETTERS ///////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    // START DATE
    startDate : function (newDate) {
      if ( typeof(newDate) != "undefined" ) {
        startDate = new Date(newDate);
        return this.runCalculations();
      }
      return startDate;
    },
    
    // END DATE
    endDate : function (newDate) {
       if ( typeof(newDate) != "undefined" ) {
        endDate = new Date(newDate);
        return this.runCalculations();
      }
      return endDate;
    },
    
    dates : function (newStartDate, newEndDate) {
      var runCalcs = false;
      if ( typeof(newStartDate) != "undefined" ) {
        startDate = new Date(newStartDate);
        runCalcs = true;
      }
      if ( typeof(newEndDate) != "undefined" ) {
        endDate = new Date(newEndDate);
        runCalcs = true;
      }
      if (runCalcs)
        return this.runCalculations();
      return {start: startDate, end: endDate};
    },
    
    today : function () {
      return today;
    },
    
    // DAYS
    days : function (d) {
      if ( typeof(d) === "number" ) {
        endDate.setTime(startDate.getTime());
        endDate.setDate(startDate.getDate() + d)
        return this.runCalculations();
      }
      return offsetDays;
    },
    
    // WEEK DAYS
    weekDays : function (wd) {
      if ( typeof(wd) === "number" ) {
        endDate.setTime(startDate.getTime());
        var remainder = wd % 5; // MODULUS!
        endDate.setDate(startDate.getDate() + ((wd-remainder)/5) * 7);
        while ( remainder > 0 ) {
          if ( endDate.getDay()>0 && endDate.getDay()>6 ) {
            remainder--;
          }
          endDate.setDate(endDate.getDate()+1);
        }
        return this.runCalculations();
      }
      return offsetWeekDays;
    },
    
    // WORK DAYS -- TKTKTK
    workdays : function (wd) {
      if ( typeof(wd) === "number" ) {
        endDate.setTime(startDate.getTime());
        var remainder = wd % 5; // MODULUS!
        endDate.setDate(startDate.getDate() + ((wd-remainder)/5) * 7);
        while ( remainder > 0 ) {
          if ( endDate.getDay()>0 && endDate.getDay()>6 ) {
            remainder--;
          }
          endDate.setDate(endDate.getDate()+1);
        }
        return this.runCalculations();
      }
      return offsetWorkDays;
    },
    
    // WEEKS
    weeks : function (w) {
      if ( typeof(w) === "number" ) {
        endDate.setTime(startDate.getTime());
        endDate.setDate(startDate.getDate() + w*7)
        return this.runCalculations();
      }
      return offsetWeeks;
    },
    
    // MONTHS
    months : function (m) {
      if ( typeof(m) === "number" ) {
        endDate.setTime(startDate.getTime());
        endDate.setMonth(startDate.getMonth() + m)
        return this.runCalculations();
      }
      return offsetMonths;
    },
    
    // YEARS
    years : function (y) {
      if ( typeof(y) === "number" ) {
        endDate.setTime(startDate.getTime());
        endDate.setFullYear(startDate.getFullYear() + y);
        return this.runCalculations();
      }
      return offsetYears;
    },
    
    duration : function () {
      return durationObject;
    },
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    // CALCULATORS /////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    // DAYS
    calculateDays : function () {
      offsetDays = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
      return this;
    },
    
    // WEEK DAYS
    calculateWeekDays : function () {
      var remainderDays = offsetDays - offsetWeeks * 7,
          tmpEndDate = new Date(endDate.getTime());
      
      // Start with 5 weekdays per full week.
      offsetWeekDays = offsetWeeks * 5;
      
      // If there are remainder days...
      while ( remainderDays > 0 ) {
        
        // Add 1 to offsetWeekDays if tmpEndDate is a weekday.
        if (tmpEndDate.getDay() < 6 && tmpEndDate.getDay() > 0) {
          offsetWeekDays++;
        }
        
        // subtract one day.
        tmpEndDate.setDate(tmpEndDate.getDate()-1);
        
        // decrement remainder count
        remainderDays--;
      }
      return this;
    },
    
    // WORK DAYS
    calculateWorkDays : function () {
      var tmpEndDate = new Date(endDate.getTime()),
          tmpWorkingDate = new Date();
      
      // Start with the number of weekdays minus 10 for each full year.
      offsetWorkDays = offsetWeekDays - offsetYears * 10;
      
      // Set the temporary end date back that many years.
      tmpEndDate.setFullYear(tmpEndDate.getFullYear() - offsetYears);
      
      
      if (tmpEndDate.getTime() > startDate.getTime()) {
        // TKTKTK
      }
    },
    
    // WEEKS
    calculateWeeks : function () {
      var tmpstartDate = new Date(startDate.getTime()),
          tmpEndDate = new Date(endDate.getTime());
      
      // Roll the working start date to the previous sunday.
      tmpstartDate.setDate(startDate.getDate()-startDate.getDay());
      
      // Roll the working end date to the previous sunday.
      tmpEndDate.setDate(endDate.getDate()-endDate.getDay());
      
      // Calculate number of weeks between working dates
      offsetWeeks = Math.ceil(((tmpEndDate.getTime() - tmpstartDate.getTime()) / millisecondsPerDay) / 7);
      
      // Remove one week if the start date falls later in the week than the end date.
      if (startDate.getDay()-1 >= endDate.getDay() && offsetWeeks > 0) offsetWeeks--;
      
      return this;
    },
    
    // MONTHS
    calculateMonths : function () {
    
      // Start with 12 months for each year.
      offsetMonths = 12 * offsetYears;
      
      // If end date is in a later month in the year than the start date, add the difference.
      if ( endDate.getMonth() > startDate.getMonth() )
        offsetMonths += endDate.getMonth() - startDate.getMonth();
        
      // If end date is in an earlier month in the year than the start date, add the difference.
      if ( endDate.getMonth() < startDate.getMonth() )
        offsetMonths +=  startDate.getMonth() - endDate.getMonth();
        
      // If the end date is later in its month than the start date, subtract one month.
      if ( offsetMonths > 0 && endDate.getDate() < startDate.getDate() )
        offsetMonths--;
           
      return this;
    },
    
    // YEARS
    calculateYears : function () {
      
      // Start with the difference between the two years.
      offsetYears = endDate.getYear() - startDate.getYear();
      
      // If the end date is earlier in the year than the start date, subtract one.
      if ( offsetYears > 0 && endDate.getMonth() < startDate.getMonth() )
        offsetYears = offsetYears - 1;
      
      // And catch it if they are in the same month of different years, but the end date is earlier in the month.
      if ( offsetYears > 0 && endDate.getMonth() == startDate.getMonth() && endDate.getDate() < startDate.getDate() )
        offsetYears = offsetYears - 1;
        
      return this;
    },
    
    // DURATION OBJECT
    calculateDuration : function () {
      
      // Reset the durationObject
      durationObject = {};
      
      // Grab the years.
      durationObject.years = offsetYears;
      
      // Calculate remainder months.
      durationObject.months = offsetMonths - (12 * offsetYears);
      
      // Create a temporary start date rolled forward that many years and months.
      tmpStartDate = new Date(startDate.getTime());
      tmpStartDate.setFullYear(tmpStartDate.getFullYear() + durationObject.years);
      tmpStartDate.setMonth(tmpStartDate.getMonth() + durationObject.months);
      
      // Find the full weeks in the remaining days.
      durationObject.weeks = Math.floor((endDate.getDate() - tmpStartDate.getDate())/7);
      
      // And any days left over.
      durationObject.days = (endDate.getDate() - tmpStartDate.getDate())-(durationObject.weeks*7);
      
      return this;
    },
    
    // RUN CALCULATIONS
    //
    // Calls the calculators in the right order.
    // Returns this.
    runCalculations : function () {
      // calculateOffsetWeekDays depends on calculateOffsetDays and calculateOffsetWeeks going first
      // calculateOffsetMonths depends on calculateOffsetYears going first
      return this.calculateDays().calculateWeeks().calculateWeekDays().calculateYears().calculateMonths().calculateDuration().validate();
    },
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    // REPORTS /////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
        
    summary : function () {
    
      offsetSummary = "";
      
      var tmp, tmpStartDate;
      
      // years
      if ( offsetYears > 0 )
        offsetSummary = offsetSummary+durationObject.years+" year"+pluralize(offsetYears);
        
      // months
      if ( durationObject.months > 0)
        offsetSummary = serialComma(offsetSummary)+durationObject.months+" month"+pluralize(durationObject.months);
      
      // weeks
      if (durationObject.weeks>0)
        offsetSummary = serialComma(offsetSummary)+durationObject.weeks+" week"+pluralize(durationObject.weeks);
        
      // days
      if (durationObject.days>0)
        offsetSummary = serialComma(offsetSummary)+durationObject.days+" day"+pluralize(durationObject.days);
      
      // trap for same start and end date
      if (offsetSummary == "")
        offsetSummary = "The start and end dates are the same."
      
      return offsetSummary;
    },
    
    startDateString : function () {
      return startDate.toLocaleDateString();
    },
    
    endDateString : function () {
      return endDate.toLocaleDateString();
    },
    
    startDateDayOfWeek : function () {
      return dayOfWeek[startDate.getDay()];
    },
    
    endDateDayOfWeek : function () {
      return dayOfWeek[endDate.getDay()];
    },
    
    todayString : function () {
      return today.toLocaleDateString();
    },
    
    todayDayOfWeek : function () {
      return dayOfWeek[today.getDay()];
    },
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    // VALIDATE ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    // returns false if start and end dates are reversed in time.
    validate : function () {
      if ( startDate.getTime() > endDate.getTime() )
        return false;
      return this;
    },
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    // INITIALIZE //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    initialize : function () {
      
      today = new Date();
      today.setHours(00);
      today.setMinutes(00);
      today.setSeconds(00);
      
      if (typeof(start)!='undefined') {
        startDate = new Date(start);
      } else {
        startDate = new Date(today.getTime());
      }
      
      if (typeof(end)!='undefined') {
        endDate = new Date(end);
      } else {
        endDate = new Date(today.getTime());
      }
      
      return this.runCalculations();
      
    }
  };

  return module.initialize();
  
}