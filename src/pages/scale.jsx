// src/pages/scale.tsx
import React, { useCallback, useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import questions from '../ask/scale.json';
import './scale.css';

// Helper function to calculate total score for a dimension
function calculateDimensionScore(survey, questionNames, reversedQuestions) {
  let totalScore = 0;
  let count = 0;

  questionNames.forEach((qName) => {
    const answer = survey.data[qName];
    if (answer !== undefined) {
      let score = answer;
      // Apply reversed scoring if needed
      if (reversedQuestions.includes(qName)) {
        score = 6 - answer;
      }
      totalScore += score;
      count += 1;
    }
  });

  return count > 0 ? totalScore / count : 0;
}

// Helper function to calculate all dimension scores
function calculateAllScores(survey) {
  // Define questions by dimension based on the spreadsheet
  const dimensions = {
    demand: {
      questions: ['q1', 'q5', 'q8', 'q13', 'q18', 'q23', 'q28', 'q33', 'q38', 'q43'],
      reversed: ['q8', 'q18', 'q38', 'q43'],
    },
    social: {
      questions: ['q2', 'q6', 'q11', 'q16', 'q21', 'q26', 'q31', 'q36', 'q41'],
      reversed: ['q2', 'q6', 'q21', 'q36', 'q41'],
    },
    autonomy: {
      questions: ['q3', 'q10', 'q15', 'q20', 'q25', 'q30', 'q35', 'q40', 'q44'],
      reversed: ['q10', 'q20', 'q35', 'q44'],
    },
    adjustment: {
      questions: ['q4', 'q9', 'q14', 'q19', 'q24', 'q29', 'q34', 'q39'],
      reversed: ['q4', 'q14', 'q24', 'q29', 'q39'],
    },
    cooperation: {
      questions: ['q7', 'q12', 'q17', 'q22', 'q27', 'q32', 'q37', 'q42'],
      reversed: ['q17', 'q27', 'q37'],
    },
  };

  const scores = {
    demand: calculateDimensionScore(
      survey,
      dimensions.demand.questions,
      dimensions.demand.reversed
    ),
    social: calculateDimensionScore(
      survey,
      dimensions.social.questions,
      dimensions.social.reversed
    ),
    autonomy: calculateDimensionScore(
      survey,
      dimensions.autonomy.questions,
      dimensions.autonomy.reversed
    ),
    adjustment: calculateDimensionScore(
      survey,
      dimensions.adjustment.questions,
      dimensions.adjustment.reversed
    ),
    cooperation: calculateDimensionScore(
      survey,
      dimensions.cooperation.questions,
      dimensions.cooperation.reversed
    ),
  };

  return scores;
}

// Generate pages with all questions using RATING type
const pages = questions.map((question, index) => ({
  elements: [
    {
      type: 'rating',
      name: `q${index + 1}`,
      title: question.question,
      isRequired: true,
      rateMin: 1,
      rateMax: 5,
      minRateDescription: '从不',
      maxRateDescription: '总是',
      displayMode: 'buttons',
    },
  ],
}));

// Survey JSON configuration with all 44 questions
const surveyJson = {
  title: 'ASK-A 家长性格特质及色彩测评',
  description:
    '前言：下面是一些描述个人性格特质的句子，请根据每个句子与您本人特征的符合程度来打分。',
  showProgressBar: 'top',
  progressBarType: 'buttons',
  showQuestionNumbers: 'on',
  questionsOnPageMode: 'singlePage',
  firstPageIsStartPage: true,
  startSurveyText: '开始测评',
  pagePrevText: '上一题',
  pageNextText: '下一题',
  completeText: '提交',
  pages: [{}, ...pages],
};

const ScalePage = () => {
  const survey = new Model(surveyJson);
  const [isComplete, setIsComplete] = useState(false);
  // Apply mobile-friendly settings
  // survey.showNavigationButtons = 'top';
  survey.widthMode = 'responsive';

  // Handle survey completion
  const onComplete = useCallback((sender) => {
    // Calculate dimension scores
    const scores = calculateAllScores(sender);
    setIsComplete(true);
    // Add scores to survey data for display in completedHtml
    sender.setValue('demandScore', scores.demand.toFixed(2));
    sender.setValue('socialScore', scores.social.toFixed(2));
    sender.setValue('autonomyScore', scores.autonomy.toFixed(2));
    sender.setValue('adjustmentScore', scores.adjustment.toFixed(2));
    sender.setValue('cooperationScore', scores.cooperation.toFixed(2));

    // Optional: Send results to your backend
    console.log('Survey Results:', sender.data);
    console.log('Dimension Scores:', scores);
  }, []);

  survey.onComplete.add(onComplete);

  return (
    <div className="scale-page">{isComplete ? <CompletePage /> : <Survey model={survey} />}</div>
  );
};

const CompletePage = () => {
  return <div>Completed</div>;
};

export default ScalePage;
