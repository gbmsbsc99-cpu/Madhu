# AI Models Training Scripts

This directory contains training scripts for all ML models.

## Usage

```bash
# Install dependencies
pip install -r requirements.txt

# Train readmission model
python train_readmission.py --data data/readmission_data.csv --output models/readmission_model.pkl

# Train LOS model
python train_los.py --data data/los_data.csv --output models/los_model.pkl

# Evaluate models
python evaluate_models.py --models_dir models/
```

## Data Format

CSV files with columns matching the feature names in respective model classes.

## Cross-Validation

Models use 5-fold cross-validation to prevent overfitting.

## Hyperparameter Tuning

Optional: Use GridSearchCV for hyperparameter optimization
