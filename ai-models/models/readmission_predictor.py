import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib

class ReadmissionPredictor:
    """
    Predicts 30-day hospital readmission risk
    """
    
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=15,
            random_state=42,
            class_weight='balanced'
        )
        self.scaler = StandardScaler()
        self.feature_names = [
            'age', 'los', 'comorbidities_count', 'glucose', 
            'creatinine', 'hemoglobin', 'heart_rate_var',
            'systolic_bp', 'diastolic_bp', 'respiratory_rate'
        ]
    
    def train(self, X, y):
        """
        Train the readmission prediction model
        
        Args:
            X: Feature matrix (n_samples, n_features)
            y: Target labels (0=no readmission, 1=readmission)
        """
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        return self
    
    def predict(self, X):
        """
        Predict readmission risk
        
        Returns:
            Array of risk scores (0-100)
        """
        X_scaled = self.scaler.transform(X)
        probabilities = self.model.predict_proba(X_scaled)[:, 1]
        return (probabilities * 100).astype(int)
    
    def predict_proba(self, X):
        """
        Get probability estimates
        """
        X_scaled = self.scaler.transform(X)
        return self.model.predict_proba(X_scaled)
    
    def get_feature_importance(self):
        """
        Get feature importance scores
        """
        importance = self.model.feature_importances_
        return dict(zip(self.feature_names, importance))
    
    def save(self, filepath):
        joblib.dump({'model': self.model, 'scaler': self.scaler}, filepath)
    
    def load(self, filepath):
        data = joblib.load(filepath)
        self.model = data['model']
        self.scaler = data['scaler']
        return self
