export class PlayerRatingEngine {
    private readonly META_ATTRIBUTES = [
        "Dribbling", "Concentration", "Anticipation", "Acceleration",
        "Balance", "Strength", "Jumping Reach", "Pace", "Agility"
    ];
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

    private readonly META_MULTIPLIER = 2;
    private readonly POS_MULTIPLIER = 4;
    private readonly MAX_ATTRIBUTE_VALUE = 20;
    private readonly TOTAL_ATTRIBUTES = 36;

    constructor() {}

    calculateRating(attributes: { name: string; value: number }[], position: string = ''): number {
        // Step 1: Calculate maximum possible sums
        const maxBaseSum = this.TOTAL_ATTRIBUTES * this.MAX_ATTRIBUTE_VALUE;
        const maxMetaSum = this.META_ATTRIBUTES.length * this.MAX_ATTRIBUTE_VALUE * this.META_MULTIPLIER;
        
        // Get position-specific attributes
        let positionAttributes: string[] = [];
        switch(position) {
            case 'GK': positionAttributes = this.GK_ATTRIBUTES; break;
            case 'CB': positionAttributes = this.CB_ATTRIBUTES; break;
            case 'FB': positionAttributes = this.FB_ATTRIBUTES; break;
            case 'DM': positionAttributes = this.DM_ATTRIBUTES; break;
            case 'CM': positionAttributes = this.CM_ATTRIBUTES; break;
            case 'AM': positionAttributes = this.AM_ATTRIBUTES; break;
            case 'WING': positionAttributes = this.WING_ATTRIBUTES; break;
            case 'ST': positionAttributes = this.ST_ATTRIBUTES; break;
        }

        const maxPosSum = position ? positionAttributes.length * this.MAX_ATTRIBUTE_VALUE * this.POS_MULTIPLIER : 0;
        const maxTotalSum = maxBaseSum + maxMetaSum + maxPosSum - 
            (this.META_ATTRIBUTES.length * this.MAX_ATTRIBUTE_VALUE) -
            (position ? positionAttributes.length * this.MAX_ATTRIBUTE_VALUE : 0);

        // Step 2: Calculate weighted sum of player's attributes
        const weightedSum = attributes.reduce((sum, attr) => {
            let multiplier = 1;
            if (this.META_ATTRIBUTES.includes(attr.name)) multiplier *= this.META_MULTIPLIER;
            if (positionAttributes.includes(attr.name)) multiplier *= this.POS_MULTIPLIER;
            return sum + (attr.value * multiplier);
        }, 0);

        // Step 3: Normalize to 1-100 scale
        const rating = (weightedSum / maxTotalSum) * 100;
        
        return Math.round(rating * 100) / 100;
    }
}

// there are 36 attributes in total
// there are from 0 to 20 for each attribute
// the sum of all attributes is dynamic and normalized
// Rating is a scale from 1 to 100

// More valuable attributes (meta attributes) are:
// Drybling, Koncentracja, Przewidywanie, Przyspieszenie, Rownowaga, Sila, Skocznosc, Szybkosc, Zwinnosc
// These attributes are worth x5 points, because they are the meta and can win games alone (except GK)

// The formula for calculating the rating is:
// Step 1: Calculate the maximum possible sum of all attributes
//max_base_sum = 36 * 20  // 36 attributes, each with max value 20
//max_meta_sum = 9 * 20 * 5  // 9 meta attributes x5 weighting, each with max value 20
//max_total_sum = max_base_sum + max_meta_sum - (9 * 20)  // Removing duplicate meta attribute count

// Step 2: Calculate the weighted sum of the player's attributes
//weighted_sum = sum(value * (5 if key in valued_attributes else 1) for key, value in attributes.items())

// Step 3: Normalize to a 1-100 scale
//rating = round((weighted_sum / max_total_sum) * 100, 2)

// Example:
// normal_attributes = 336
// meta_attributes x5 = 565
// max_total_sum = (36 - 9) * 20 + (9 * 20 * 5) = 180 + 900 = 1080
// weighted_sum = 336 + 565 = 901
// rating = round((901 / 1080) * 100, 2)
// rating = 83.43

export default PlayerRatingEngine;
