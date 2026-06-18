import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
import joblib

class LengthOfStayPredictor:
    """
    Predicts hospital length of stay (LOS) in days
    """
    
    def __init__(self):
        self.model = GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.05,
            max_depth=5,
            random_state=42
        )
        self.scaler = StandardScaler()
        self.feature_names = [
            'age', 'admission_type', 'primary_diagnosis',
            'comorbidities_count', 'severity_score',
            'procedure_count', 'discharge_disposition'
        ]
    
    def train(self, X, y):
        """
        Train LOS prediction model
        
        Args:
            X: Feature matrix
            y: LOS in days (target variable)
        """
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        return self
    
    def predict(self, X):
        """
        Predict length of stay
        
        Returns:
            Array of predicted LOS in days
        """
        X_scaled = self.scaler.transform(X)
        predictions = self.model.predict(X_scaled)
        return np.maximum(predictions, 1)  # Minimum 1 day
    
    def get_feature_importance(self):
        importance = self.model.feature_importances_
        return dict(zip(self.feature_names, importance))
    
    def save(self, filepath):
        joblib.dump({'model': self.model, 'scaler': self.scaler}, filepath)
    
    def load(self, filepath):
        data = joblib.load(filepath)
        self.model = data['model']
        self.scaler = data['scaler']
        return self
