export class ValidationService {
  // Email validation
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone number validation (basic)
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
  }

  // Blood pressure validation
  static isValidBloodPressure(systolic: number, diastolic: number): boolean {
    return systolic > 0 && diastolic > 0 && systolic > diastolic;
  }

  // Heart rate validation (30-200 bpm)
  static isValidHeartRate(rate: number): boolean {
    return rate >= 30 && rate <= 200;
  }

  // Temperature validation (Celsius, 32-42°C)
  static isValidTemperature(temp: number): boolean {
    return temp >= 32 && temp <= 42;
  }

  // Oxygen saturation validation (0-100%)
  static isValidOxygenSaturation(spo2: number): boolean {
    return spo2 >= 0 && spo2 <= 100;
  }

  // Blood glucose validation
  static isValidBloodGlucose(glucose: number): boolean {
    return glucose >= 0 && glucose <= 600;
  }

  // MRN validation
  static isValidMRN(mrn: string): boolean {
    return mrn.length >= 5 && mrn.length <= 20;
  }

  // Medical license number validation
  static isValidLicenseNumber(license: string): boolean {
    return license.length >= 5 && license.length <= 20;
  }

  // Date validation
  static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Age validation
  static isValidAge(dateOfBirth: string): boolean {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age > 0 && age < 150;
  }
}
