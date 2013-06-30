describe("DateCalculator", function() {
  
  var dateCalculator;
  
  var today = new Date();
  today.setHours(00);
  today.setMinutes(00);
  today.setSeconds(00);
  
  var startDateString = '8/17/1979';
  var startTestDate = new Date(startDateString);
  
  var endDateString = '6/4/2005';
  var endTestDate = new Date(endDateString);
  
  var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Initializing and setting dates.
  describe("setting and getting the start and end dates", function() {
    
    beforeEach(function () {
      dateCalculator = new DateCalculator();
    });
    
    it("should default to today for both start and end dates when it is given none", function() {
      expect(dateCalculator.startDate().toLocaleDateString()).toEqual(today.toLocaleDateString());
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual(today.toLocaleDateString());
      expect(dateCalculator.today().toLocaleDateString()).toEqual(today.toLocaleDateString());
    });
    
    it("should set the start date when passed a date string", function() {
      
      dateCalculator.startDate(startDateString);
      
      expect(dateCalculator.startDate().toLocaleDateString()).toEqual(startTestDate.toLocaleDateString());
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual(today.toLocaleDateString());
      expect(dateCalculator.today().toLocaleDateString()).toEqual(today.toLocaleDateString());
    });
    
    it("should set the end date when passed a date string", function() {
      
      dateCalculator.endDate(endDateString);
      
      expect(dateCalculator.startDate().toLocaleDateString()).toEqual(today.toLocaleDateString());
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual(endTestDate.toLocaleDateString());
      expect(dateCalculator.today().toLocaleDateString()).toEqual(today.toLocaleDateString());
    });
    
    it("should set both dates when given two date strings", function() {
      
      dateCalculator.dates(startDateString, endDateString);
      
      expect(dateCalculator.startDate().toLocaleDateString()).toEqual(startTestDate.toLocaleDateString());
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual(endTestDate.toLocaleDateString());
      expect(dateCalculator.today().toLocaleDateString()).toEqual(today.toLocaleDateString());
    });
    
    it("should initialize with a start and end date when date strings are passed to the initializer", function() {
      
      dateCalculator = new DateCalculator(startDateString, endDateString);
      
      expect(dateCalculator.startDate().toLocaleDateString()).toEqual(startTestDate.toLocaleDateString());
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual(endTestDate.toLocaleDateString());
      expect(dateCalculator.today().toLocaleDateString()).toEqual(today.toLocaleDateString());
    });
    
  });
  
  // Calculating Offsets
  describe("calculating offsets between two dates", function() {
    
    beforeEach(function() {
      dateCalculator = new DateCalculator("10/10/1968", "10/14/1984");
    });
    
    it("should return the number of days between two dates as an integer", function() {
      expect(dateCalculator.days()).toEqual(5848);
    });
    
    it("should return the number of week days between two dates as an integer", function() {
      expect(dateCalculator.weekDays()).toEqual(4176);
    });
    
    it("should return the number of weeks between two dates as an integer", function() {
      expect(dateCalculator.weeks()).toEqual(835);
    });
    
    it("should return the number of weeks between two dates as an integer, even when the end date is later in its week than the start date", function() {
      dateCalculator = new DateCalculator("5/3/2013", "5/14/2013");
      expect(dateCalculator.weeks()).toEqual(1);
    });
    
    it("should return the number of months between two dates as an integer", function() {
      expect(dateCalculator.months()).toEqual(192);
    });
    
    it("should return the number of months between two dates as an integer, even when the end date falls later in its month than the start date", function() {
      dateCalculator = new DateCalculator("3/25/2013", "5/14/2013");
      expect(dateCalculator.months()).toEqual(1);
    });
    
    it("should return the number of years between two dates as an integer", function() {
      expect(dateCalculator.years()).toEqual(16);
    });
    
    it("should return the duration between two dates as an object", function() {
      expect(dateCalculator.duration()).toEqual({ years : 16, months : 0, weeks : 0, days : 4 });
    });
    
  });
  
  // Calculating end dates based on given offsets
  describe("calculating end dates based on given offsets", function() {
    
    beforeEach(function() {
      dateCalculator = new DateCalculator("8/17/1979");
    });
    
    it("should return the correct end date given a number of days", function() {
      dateCalculator.days(10);
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual("8/27/1979");
    });
    
    it("should return the correct end date given a number of week days", function() {
      dateCalculator.weekDays(10)
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual("8/31/1979");
    });
    
    it("should return the correct end date given a number of weeks", function() {
      dateCalculator.weeks(10)
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual("10/26/1979");
    });
    
    it("should return the correct end date given a number of months", function() {
      dateCalculator.months(10)
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual("6/17/1980");
    });
    
    it("should return the correct end date given a number of years", function() {
      dateCalculator.years(10)
      expect(dateCalculator.endDate().toLocaleDateString()).toEqual("8/17/1989");
    });
    
  });
  
  // Reports
  describe("reporting", function() {
  
    beforeEach(function() {
      dateCalculator = new DateCalculator("10/10/1968", "10/14/1984");
    });
  
    it("should report the dates as locale date strings", function() {
      expect(dateCalculator.startDateString()).toEqual("10/10/1968");
      expect(dateCalculator.endDateString()).toEqual("10/14/1984");
      expect(dateCalculator.todayString()).toEqual(today.toLocaleDateString());
    });
    
    it("should report the day of the week for the dates", function() {
      expect(dateCalculator.startDateDayOfWeek()).toEqual("Thursday");
      expect(dateCalculator.endDateDayOfWeek()).toEqual("Sunday");
      expect(dateCalculator.todayDayOfWeek()).toEqual(dayOfWeek[today.getDay()]);
    });
    
    it("should report offset as a summary string", function() {
      expect(dateCalculator.summary()).toEqual("16 years, 4 days");
    });
  
  });
  
});