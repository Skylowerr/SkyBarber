// 1. Helper Functions to Test Business Logic
function isValidServicePrice(price: any): boolean {
    const num = Number(price);
    return !isNaN(num) && num > 0 && num <= 5000; // Prices must be positive and within a realistic range
}

function isWorkingHour(time: string): boolean {
    const workingHours = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    return workingHours.includes(time);
}

// 2. JEST TEST SUITE
describe('SkyBarber Backend - Business Logic & Data Validation Unit Tests', () => {

    // A) Service Price Validation Tests
    describe('Service Price Validation Module', () => {
        it('should accept valid service prices (e.g., 250 TL)', () => {
            expect(isValidServicePrice(250)).toBe(true);
            expect(isValidServicePrice("150")).toBe(true); // Should parse string numbers correctly
        });

        it('should reject negative, zero, or invalid price values', () => {
            expect(isValidServicePrice(-50)).toBe(false);
            expect(isValidServicePrice(0)).toBe(false);
            expect(isValidServicePrice("free")).toBe(false);
        });
    });

    // B) Appointment Hours Validation Tests
    describe('Appointment Time Slot Validation Module', () => {
        it('should accept appointment requests within official working hours', () => {
            expect(isWorkingHour("09:00")).toBe(true);
            expect(isWorkingHour("14:00")).toBe(true);
        });

        it('should reject appointment requests outside working hours (night or lunch breaks)', () => {
            expect(isWorkingHour("22:00")).toBe(false); // Shop is closed at night
            expect(isWorkingHour("12:00")).toBe(false); // Lunch break slot
            expect(isWorkingHour("08:30")).toBe(false); // Shop has not opened yet
        });
    });

});