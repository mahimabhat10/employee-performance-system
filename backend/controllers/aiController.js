exports.getRecommendation = async (req, res) => {

  const { performanceScore, skills } = req.body;

  let recommendation = "";

  if (performanceScore > 85) {

    recommendation =
      "Eligible for promotion.";

  } else if (performanceScore < 50) {

    recommendation =
      "Needs improvement training.";

  } else {

    recommendation =
      "Good performance.";
  }

  if (skills.length < 2) {

    recommendation +=
      " Improve technical skills.";
  }

  res.json({
    recommendation
  });
};