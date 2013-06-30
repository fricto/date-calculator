describe("USFederalHolidayCalculator", function() {

  var holidayCalculator, checkDate;

  describe("calculates US Federal Holidays", function () {
    beforeEach(function () {
      holidayCalculator = new USFederalHolidayCalculator(2012);
      checkDate = new Date('1/1/12');
      checkDate.setHours(00);
      checkDate.setMinutes(00);
      checkDate.setSeconds(00);
    });
    it("should calculate New Years Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(1);
      checkDate.setDate(1);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Inauguration Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(1);
      checkDate.setDate(20);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Martin Luther King, Jr. Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(1);
      checkDate.setDate(16);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Washington's Birthday", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(2);
      checkDate.setDate(20);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Memorial Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(5);
      checkDate.setDate(28);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Independence Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(7);
      checkDate.setDate(4);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Labor Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(9);
      checkDate.setDate(3);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Columbus Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(10);
      checkDate.setDate(8);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Veterans Day", function() {
      checkDate.setYear(2013);
      checkDate.setMonth(11);
      checkDate.setDate(11);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Thanksgiving Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(11);
      checkDate.setDate(22);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
    it("should calculate Christmas Day", function() {
      checkDate.setYear(2012);
      checkDate.setMonth(12);
      checkDate.setDate(25);
      expect(holidayCalculator.startDate())).toEqual(today.toLocaleDateString(checkDate.getTime()));
    });
  });
});