// Define the interface for attribute structure
interface Attribute {
  category: string;
  name: string;
  value: number;
}

// Export the static attributes array with proper typing
export const staticAttributes: Attribute[] = [
    // Goalkeeping Attributes
    { category: "Goalkeeping", name: "Handling", value: 0 },
    { category: "Goalkeeping", name: "Eccentricity", value: 0 },
    { category: "Goalkeeping", name: "Command of Area", value: 0 },
    { category: "Goalkeeping", name: "One on Ones", value: 0 },
    { category: "Goalkeeping", name: "Communication", value: 0 },
    { category: "Goalkeeping", name: "Punching (Tendency)", value: 0 },
    { category: "Goalkeeping", name: "Passing", value: 0 },
    { category: "Goalkeeping", name: "First Touch", value: 0 },
    { category: "Goalkeeping", name: "Reflexes", value: 0 },
    { category: "Goalkeeping", name: "Rushing Out (Tendency)", value: 0 },
    { category: "Goalkeeping", name: "Kicking", value: 0 },
    { category: "Goalkeeping", name: "Throwing", value: 0 },
    { category: "Goalkeeping", name: "Aerial Reach", value: 0 },
    
    // Technical Attributes
    { category: "Technical", name: "Long Throws", value: 0 },
    { category: "Technical", name: "Crossing", value: 0 },
    { category: "Technical", name: "Dribbling", value: 0 },
    { category: "Technical", name: "Heading", value: 0 },
    { category: "Technical", name: "Marking", value: 0 },
    { category: "Technical", name: "Tackling", value: 0 },
    { category: "Technical", name: "Passing", value: 0 },
    { category: "Technical", name: "First Touch", value: 0 },
    { category: "Technical", name: "Penalty Taking", value: 0 },
    { category: "Technical", name: "Corners", value: 0 },
    { category: "Technical", name: "Free Kick Taking", value: 0 },
    { category: "Technical", name: "Long Shots", value: 0 },
    { category: "Technical", name: "Technique", value: 0 },
    { category: "Technical", name: "Finishing", value: 0 },
    
    // Psychical Attributes
    { category: "Psychical", name: "Aggression", value: 0 },
    { category: "Psychical", name: "Flair", value: 0 },
    { category: "Psychical", name: "Decisions", value: 0 },
    { category: "Psychical", name: "Determination", value: 0 },
    { category: "Psychical", name: "Off The Ball", value: 0 },
    { category: "Psychical", name: "Concentration", value: 0 },
    { category: "Psychical", name: "Composure", value: 0 },
    { category: "Psychical", name: "Work Rate", value: 0 },
    { category: "Psychical", name: "Vision", value: 0 },
    { category: "Psychical", name: "Anticipation", value: 0 },
    { category: "Psychical", name: "Leadership", value: 0 },
    { category: "Psychical", name: "Positioning", value: 0 },
    { category: "Psychical", name: "Bravery", value: 0 },
    { category: "Psychical", name: "Teamwork", value: 0 },
    
    // Physical Attributes
    { category: "Physical", name: "Acceleration", value: 0 },
    { category: "Physical", name: "Balance", value: 0 },
    { category: "Physical", name: "Strength", value: 0 },
    { category: "Physical", name: "Jumping Reach", value: 0 },
    { category: "Physical", name: "Natural Fitness", value: 0 },
    { category: "Physical", name: "Pace", value: 0 },
    { category: "Physical", name: "Stamina", value: 0 },
    { category: "Physical", name: "Agility", value: 0 }
];
