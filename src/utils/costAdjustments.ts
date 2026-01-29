// Cost adjustment utility based on user questionnaire answers
export interface CostAdjustments {
  rent: number[];
  food: number[];
  transport: number[];
  misc: number[];
  average_total: number[];
}

export const adjustCostsBasedOnAnswers = (
  baseCosts: CostAdjustments,
  answers: any
): CostAdjustments => {
  const adjustedCosts = { ...baseCosts };

  // Accommodation adjustments
  const accommodationMultipliers: { [key: string]: number } = {
    'on_campus': 0.7,        // University housing is cheaper
    'shared': 0.8,           // Shared accommodation reduces cost
    'private_hostel': 0.9,   // Private hostels are moderate
    'co_living': 1.0,        // Co-living is average
    'off_campus': 1.1,       // Off-campus apartments are more expensive
    'studio': 1.3            // Studio apartments are most expensive
  };

  // Food adjustments
  const foodMultipliers: { [key: string]: number } = {
    'cook_own': 0.6,         // Cooking yourself is cheapest
    'meal_plan': 0.8,        // University meal plans are moderate
    'eat_outside': 1.4       // Eating out is most expensive
  };

  // Transport adjustments
  const transportMultipliers: { [key: string]: number } = {
    'bicycle': 0.3,          // Bicycle is cheapest
    'public_transport': 1.0, // Public transport is average
    'taxi': 2.5              // Taxi/Uber is most expensive
  };

  // Course type adjustments (affects overall living standards)
  const courseMultipliers: { [key: string]: number } = {
    'bachelor': 0.9,         // Bachelor students typically spend less
    'master': 1.1            // Master students typically spend more
  };

  // Intake adjustments (seasonal cost variations)
  const intakeMultipliers: { [key: string]: number } = {
    'summer': 1.0,           // Summer intake is average
    'winter': 1.05           // Winter intake might have higher heating costs
  };

  // Leisure adjustments
  const leisureMultipliers: { [key: string]: number } = {
    'gym': 1.1,              // Gym membership adds to misc costs
    'movies': 1.15,          // Movies and entertainment add more
    'friends': 1.2           // Social activities are most expensive
  };

  // Mobile plan adjustments
  const mobileMultipliers: { [key: string]: number } = {
    'basic_plan': 0.8,       // Basic plan is cheaper
    'premium_plan': 1.3      // Premium plan is more expensive
  };

  // Apply accommodation adjustments
  if (answers.accommodation && accommodationMultipliers[answers.accommodation]) {
    const multiplier = accommodationMultipliers[answers.accommodation];
    adjustedCosts.rent = [
      Math.round(baseCosts.rent[0] * multiplier),
      Math.round(baseCosts.rent[1] * multiplier)
    ];
  }

  // Apply food adjustments
  if (answers.foodHabits && foodMultipliers[answers.foodHabits]) {
    const multiplier = foodMultipliers[answers.foodHabits];
    adjustedCosts.food = [
      Math.round(baseCosts.food[0] * multiplier),
      Math.round(baseCosts.food[1] * multiplier)
    ];
  }

  // Apply transport adjustments
  if (answers.transport && transportMultipliers[answers.transport]) {
    const multiplier = transportMultipliers[answers.transport];
    adjustedCosts.transport = [
      Math.round(baseCosts.transport[0] * multiplier),
      Math.round(baseCosts.transport[1] * multiplier)
    ];
  }

  // Apply course type adjustments to misc costs
  if (answers.courseType && courseMultipliers[answers.courseType]) {
    const multiplier = courseMultipliers[answers.courseType];
    adjustedCosts.misc = [
      Math.round(baseCosts.misc[0] * multiplier),
      Math.round(baseCosts.misc[1] * multiplier)
    ];
  }

  // Apply intake adjustments to all costs
  if (answers.intake && intakeMultipliers[answers.intake]) {
    const multiplier = intakeMultipliers[answers.intake];
    adjustedCosts.rent = adjustedCosts.rent.map(cost => Math.round(cost * multiplier)) as [number, number];
    adjustedCosts.food = adjustedCosts.food.map(cost => Math.round(cost * multiplier)) as [number, number];
    adjustedCosts.transport = adjustedCosts.transport.map(cost => Math.round(cost * multiplier)) as [number, number];
  }

  // Apply leisure adjustments to misc costs
  if (answers.leisure && leisureMultipliers[answers.leisure]) {
    const multiplier = leisureMultipliers[answers.leisure];
    adjustedCosts.misc = [
      Math.round(adjustedCosts.misc[0] * multiplier),
      Math.round(adjustedCosts.misc[1] * multiplier)
    ];
  }

  // Apply mobile plan adjustments to misc costs
  if (answers.mobile && mobileMultipliers[answers.mobile]) {
    const multiplier = mobileMultipliers[answers.mobile];
    const mobileImpact = 0.1; // Mobile costs are 10% of misc costs
    const adjustment = (multiplier - 1) * mobileImpact;
    adjustedCosts.misc = [
      Math.round(adjustedCosts.misc[0] * (1 + adjustment)),
      Math.round(adjustedCosts.misc[1] * (1 + adjustment))
    ];
  }

  // Recalculate average total
  adjustedCosts.average_total = [
    adjustedCosts.rent[0] + adjustedCosts.food[0] + adjustedCosts.transport[0] + adjustedCosts.misc[0],
    adjustedCosts.rent[1] + adjustedCosts.food[1] + adjustedCosts.transport[1] + adjustedCosts.misc[1]
  ];

  return adjustedCosts;
};

// Function to get adjusted cost data for a specific country
export const getAdjustedCostData = async (country: string, answers: any) => {
  try {
    const response = await fetch('/cost_data.json');
    const costData = await response.json();
    
    const countryKey = country.toLowerCase().replace(' ', '_');
    const baseCosts = costData[countryKey] || costData['germany'];
    
    return adjustCostsBasedOnAnswers(baseCosts, answers);
  } catch (error) {
    console.error('Error fetching cost data:', error);
    // Return fallback data
    return {
      rent: [600, 1200],
      food: [150, 300],
      transport: [70, 100],
      misc: [100, 250],
      average_total: [920, 1850]
    };
  }
};