class DrugInteractionDatabase:
    """
    Checks for drug-drug interactions
    Uses FDA and clinical databases
    """
    
    # Sample interaction data - in production, load from database
    INTERACTIONS = {
        ('warfarin', 'aspirin'): {
            'severity': 'severe',
            'description': 'Increased risk of bleeding',
            'evidence': 'FDA MedWatch, clinical studies',
            'recommendation': 'Monitor INR closely, consider alternative'
        },
        ('metformin', 'contrast_dye'): {
            'severity': 'moderate',
            'description': 'Risk of lactic acidosis after contrast injection',
            'evidence': 'Clinical guidelines, case reports',
            'recommendation': 'Hold metformin 48h before and after procedure'
        },
        ('lisinopril', 'potassium'): {
            'severity': 'moderate',
            'description': 'Increased hyperkalemia risk',
            'evidence': 'Pharmacology databases',
            'recommendation': 'Monitor K+ levels, use potassium-sparing diuretics with caution'
        },
    }
    
    @staticmethod
    def check_interactions(medications: list) -> list:
        """
        Check for interactions between medications
        
        Args:
            medications: List of medication names (lowercase)
        
        Returns:
            List of detected interactions
        """
        interactions = []
        medications = [m.lower() for m in medications]
        
        # Check all pairs
        for i in range(len(medications)):
            for j in range(i + 1, len(medications)):
                drug1, drug2 = medications[i], medications[j]
                
                # Check both directions
                key = tuple(sorted([drug1, drug2]))
                
                if key in DrugInteractionDatabase.INTERACTIONS:
                    interaction_data = DrugInteractionDatabase.INTERACTIONS[key]
                    interaction_data['drug1'] = drug1
                    interaction_data['drug2'] = drug2
                    interactions.append(interaction_data)
        
        # Sort by severity
        severity_order = {'severe': 0, 'moderate': 1, 'mild': 2}
        interactions.sort(key=lambda x: severity_order.get(x['severity'], 3))
        
        return interactions
    
    @staticmethod
    def add_interaction(drug1: str, drug2: str, severity: str, 
                       description: str, evidence: str, recommendation: str):
        """
        Add new interaction to database
        """
        key = tuple(sorted([drug1.lower(), drug2.lower()]))
        DrugInteractionDatabase.INTERACTIONS[key] = {
            'severity': severity,
            'description': description,
            'evidence': evidence,
            'recommendation': recommendation
        }
