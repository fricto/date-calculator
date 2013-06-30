USFederalHolidayCalculator = function (inputYear) {
  
  var holidays = {},
      workingDate = new Date(),
      year = inputYear;
  
  
  // findDay - Given a month (by ordinal), day of the week (by index) and count,
  //   determine a date. For example, 1,2,3 would be the second Monday in March.
  var findDay = function (day, count, targetMonth) {
    var tmpDate = new Date()
    tmpDate.setHours(00);
    tmpDate.setMinutes(00);
    tmpDate.setSeconds(00);
    tmpDate.setDate((count-1)*7+1);
    tmpDate.setMonth(targetMonth);
    tmpDate.setYear(year);
    
    if (tmpDate.getDay() > day) {
      tmpDate.setDate(tmpDate.getDate()+(tmpDate.getDay()-day));
    }
    
    if (tmpDate.getDay() < day) {
      tmpDate.setDate(tmpDate.getDate()+7-((tmpDate.getDay()-day)));
    }
    
    return tmpDate;
  }
  
  // avoidWeekends - Given a date, make sure it isn't a Saturday or Sunday
  // and adjust to avoid those dates. Always returns Monday for Sunday.
  // By default, returns Friday for Saturday, but this can be overwridden
  // by passing 'false' for useFridays.
  var avoidWeekends = function (targetDate, useFridays) {
    useFridays = (useFridays === 'false') ? false : true;
    if (targetDate.getDay() == 6) {
      targetDate.setDate(targetDate.getDate()+1);
    }
    if (targetDate.getDay() == 0) {
      if (useFridays) {
        targetDate.setDate(targetDate.getDate()-1);
      } else {
        targetDate.setDate(targetDate.getDate()+2);
      }
    }
    return targetDate;
  }
  
  var module = {
  
    // New Years Day - 1/1
    newYearsDay : function () {
      if (!holidays.newYearsDay) {
        workingDate.setMonth(1);
        workingDate.setDate(1);
        holidays.newYearsDay = avoidWeekends(workingDate, false).getTime();
      }
      return holidays.newYearsDay;
    },
    
    // Inauguration Day - 1/20 every 4 years. On Monday if 1/20 is a Sunday, but will be held on Saturday.
    // If it falls on a Saturday, there is no observence of it on a work day.
    inaugurationDay : function () {
      if (!holidays.inaugurationDay) {
        if (year%4 === 0) {
          workingDate.setMonth(1);
          workingDate.setDate(20);
          if (workingDate.getDay() === 0)
            workingDate.setDate(workingDate.getDate()+1);
          holidays.inaugurationDay = workingDate.getTime();
        } else {
          holidays.inaugurationDay = false;
        }
      }
      return holidays.inaugurationDay;
    },
    
    // Martin Luther King, Jr. Day - 1/15
    martinLutherKingJrDay : function () {
      if (!holidays.martinLutherKingJrDay) {
        workingDate.setMonth(1);
        workingDate.setDate(15);
        holidays.martinLutherKingJrDay = avoidWeekends(workingDate, true).getTime();
      }
      return holidays.martinLutherKingJrDay;
    },
    
    // Washington's Birthday - third Monday in February
    washingtonsBirthday : function () {
      if (!holidays.washingtonsBirthday) {
        workingDate = findDay(1,3,2);
        holidays.washingtonsBirthday = workingDate.getTime();
      }
      return holidays.washingtonsBirthday;
    },
    
    // Memorial Day - last Monday in May
    memorialDay : function () {
      if (!holidays.memorialDay) {
        // first grab the fourth monday, because there will always be at least four
        workingDate = findDay(1,4,5);
        // then see if there is room for a fifth monday and use it if so
        if (workingDate.getDay() < 24)
          workingDate.setDate(workingDate.getDate()+7);
        holidays.memorialDay = workingDate.getTime();1
      }
      return holidays.memorialDay;
    },
    
    // Independence Day - 7/4
    independenceDay : function () {
      if (!holidays.independenceDay) {
        workingDate.setMonth(7);
        workingDate.setDate(4);
        holidays.independenceDay = avoidWeekends(workingDate, true).getTime();
      }
      return holidays.independenceDay;
    },
    
    // Labor Day - 9/4
    laborDay : function () {
      if (!holidays.laborDay) {
        workingDate = findDay(1,1,9);
        holidays.laborDay = workingDate.getTime();
      }
      return holidays.laborDay;
    },
    
    // Columbus Day - second Monday in October
    columbusDay : function () {
      if (!holidays.columbusDay) {
        workingDate = findDay(1,2,10);
        holidays.columbusDay = workingDate.getTime();
      }
      return holidays.columbusDay;
    },
    
    // Veterans Day - 11/11
    veteransDay : function () {
      if (!holidays.veteransDay) {
        workingDate.setMonth(11);
        workingDate.setDate(11);
        holidays.veteransDay = avoidWeekends(workingDate, true).getTime();
      }
      return holidays.veteransDay;
    },
    
    // Thanksgiving Day - fourth Thursday in November
    thanksgivingDay : function () {
      if (!holidays.thanksgivingDay) {
        workingDate = findDay(4,4,11);
        holidays.thanksgivingDay = workingDate.getTime();
      }
      return holidays.thanksgivingDay;
    },
    
    // Christmas Day - 12/25
    christmasDay : function () {
      if (!holidays.christmasDay) {
        workingDate.setMonth(12);
        workingDate.setDate(25);
        holidays.christmasDay = avoidWeekends(workingDate, true).getTime();
      }
      return holidays.christmasDay;
    },
    
    // changeYear - change the year used to calculate holidays
    // and clear the cache
    changeYear : function (newYear) {
      //reset the cache
      holidays = {};
      workingDate.setYear(newYear);
      return this;
    },
    
    initializer : function () {
      
      if (typeof(inputYear) != 'number') {
        year = workingDate.getFullYear();
      } else {
        year = inputYear;
      }
      
      workingDate.setHours(00);
      workingDate.setMinutes(00);
      workingDate.setSeconds(00);
      workingDate.setDate(1);
      workingDate.setMonth(1);
      
      return this.changeYear(year);
    }
  
  }
  
  return module.initializer();
  
}