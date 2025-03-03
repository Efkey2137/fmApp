export class PlayerRatingEngine {
    // Meta attributes that affect overall performance
    private readonly META_ATTRIBUTES = [
        "Dribbling", "Concentration", "Anticipation", "Acceleration",
        "Balance", "Strength", "Jumping Reach", "Pace", "Agility"
    ];
    
    // Position-specific attributes
    private readonly GK_ATTRIBUTES = [
        "Reflexes", "One on Ones", "Jumping Reach", "Aerial Reach", "Positioning", "Decisions"
    ];
    private readonly CB_ATTRIBUTES = [
        "Jumping Reach", "Tackling", "Composure", "Concentration", "Strength"
    ];
    private readonly FB_ATTRIBUTES = [
        "Work Rate", "Stamina", "Positioning", "Crossing", "Technique", "Marking", "Determination"
    ];
    private readonly DM_ATTRIBUTES = [
        "First Touch", "Teamwork", "Composure", "Positioning", "Passing", "Tackling"
    ];
    private readonly CM_ATTRIBUTES = [
        "Work Rate", "Stamina", "Passing", "Decisions"
    ];
    private readonly AM_ATTRIBUTES = [
        "Vision", "Flair", "First Touch", "Off The Ball", "Technique"
    ];
    private readonly WING_ATTRIBUTES = [
        "Agility", "Dribbling", "Balance", "Flair", "Technique"
    ];
    private readonly ST_ATTRIBUTES = [
        "Off The Ball", "Composure", "Determination", "First Touch", "Finishing"
    ];
    
    private readonly META_MULTIPLIER = 1.5;
    private readonly POS_MULTIPLIER = 3;
    private readonly MAX_ATTRIBUTE_VALUE = 20;

    // Define attribute categories count
    private readonly NUMBER_OF_ATTRIBUTES = [
        { name: 'Goalkeeping', count: 13 },
        { name: 'Technical', count: 14 },
        { name: 'Psychical', count: 14 },
        { name: 'Physical', count: 8 }
    ];

    private readonly TOTAL_ATTRIBUTES = (position: string): number => {
        if (position === 'GK') {
            // For goalkeeper count Goalkeeping + Psychical + Physical
            return this.NUMBER_OF_ATTRIBUTES
                .filter(cat => ['Goalkeeping', 'Psychical', 'Physical'].includes(cat.name))
                .reduce((sum, cat) => sum + cat.count, 0);
        } else {
            // For field players count Technical + Psychical + Physical
            return this.NUMBER_OF_ATTRIBUTES
                .filter(cat => ['Technical', 'Psychical', 'Physical'].includes(cat.name))
                .reduce((sum, cat) => sum + cat.count, 0);
        }
    }

    constructor() {}

    calculateRating(attributes: { name: string; value: number }[], position: string = ''): number {
        // Step 1: Calculate maximum possible sums based on selected position
        const maxBaseSum = this.TOTAL_ATTRIBUTES(position) * this.MAX_ATTRIBUTE_VALUE;
        const maxMetaSum = this.META_ATTRIBUTES.length * this.MAX_ATTRIBUTE_VALUE * this.META_MULTIPLIER;
        
        // Get position-specific attributes
        let positionAttributes: string[] = [];
        switch(position) {
            case 'GK': 
                positionAttributes = this.GK_ATTRIBUTES; 
                break;
            case 'CB': 
                positionAttributes = this.CB_ATTRIBUTES; 
                break;
            case 'FB': 
                positionAttributes = this.FB_ATTRIBUTES; 
                break;
            case 'DM': 
                positionAttributes = this.DM_ATTRIBUTES; 
                break;
            case 'CM': 
                positionAttributes = this.CM_ATTRIBUTES; 
                break;
            case 'AM': 
                positionAttributes = this.AM_ATTRIBUTES; 
                break;
            case 'WING': 
                positionAttributes = this.WING_ATTRIBUTES; 
                break;
            case 'ST': 
                positionAttributes = this.ST_ATTRIBUTES; 
                break;
        }

        // Step 2: Remove attributes not relevant to the selected position
        const relevantAttributes = attributes.filter(attr => {
            // Include meta attributes and position-specific attributes
            return this.META_ATTRIBUTES.includes(attr.name) || positionAttributes.includes(attr.name);
        });

        // Calculate the weighted sum based on valid attributes
        const weightedSum = relevantAttributes.reduce((sum, attr) => {
            let multiplier = 1;
            // Apply multiplier for meta and position attributes
            if (this.META_ATTRIBUTES.includes(attr.name)) multiplier *= this.META_MULTIPLIER;
            if (positionAttributes.includes(attr.name)) multiplier *= this.POS_MULTIPLIER;
            return sum + (attr.value * multiplier);
        }, 0);

        // Step 3: Calculate the maximum possible sum for the valid attributes
        const maxValidSum = (this.META_ATTRIBUTES.length * this.MAX_ATTRIBUTE_VALUE * this.META_MULTIPLIER) + 
                             (positionAttributes.length * this.MAX_ATTRIBUTE_VALUE * this.POS_MULTIPLIER);

        // Step 4: Normalize the score to a 1-100 scale
        const rating = (weightedSum / maxValidSum) * 100;
        
        // Ensure the rating is within the 0-100 range
        return Math.round(Math.max(0, Math.min(rating, 100)));
    }
}

export default PlayerRatingEngine;
