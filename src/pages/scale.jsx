/* eslint-disable react/prop-types */
// src/pages/scale.tsx
import React, { useCallback, useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import groupBy from 'lodash/groupBy';
import questions from '../ask/scale';
import { DIMENSION_TEXT } from '../ask/const';
import SUGGESTIONS from '../ask/suggestion';
import COMPLIMENTS from '../ask/compliment';
import './scale.css';

// Helper function to calculate total score for a dimension
function calculateDimensionScore(dimensionQuestions) {
  let totalScore = 0;
  let count = 0;
  console.log(dimensionQuestions);
  dimensionQuestions
    .filter((q) => !!q.score)
    .forEach((q) => {
      let { score } = q;
      if (q.reverseScore) {
        score = 6 - score;
      }
      totalScore += score;
      count += 1;
    });

  return count > 0 ? totalScore / count : 0;
}

// Helper function to calculate all dimension scores
function calculateAllScores(data) {
  const scoredSortedQuestions = questions
    .map((q) => ({
      ...q,
      score: data[q.qid],
    }))
    .sort((a, b) => a.score - b.score);
  const groupByDimension = groupBy(scoredSortedQuestions, 'dimension');
  const scoreByDimension = Object.entries(groupByDimension).reduce((score, current) => {
    const [k, v] = current;
    return {
      ...score,
      [k]: calculateDimensionScore(v),
    };
  }, {});
  console.log(groupByDimension, scoreByDimension);
  return {
    groupByDimension,
    scoreByDimension,
  };
}

function selectQuestionsByScoreBands(sortedScore, groupByDimension) {
  const bandedScore = sortedScore.map((score) => ({
    dimension: score[0],
    score: score[1],
    high: score[1] >= 3,
  }));
  const highScoreQuestionByDim = bandedScore
    .filter((s) => s.high)
    .sort((a, b) => b.score - a.score)
    .map((s) => {
      const { dimension, score } = s;
      return {
        dimension,
        average: score,
        questions: groupByDimension[dimension],
      };
    });
  const lowScoreQuestionByDim = bandedScore
    .filter((s) => !s.high)
    .sort((a, b) => a.score - b.score)
    .map((s) => {
      const { dimension, score } = s;
      return {
        dimension,
        average: score,
        questions: groupByDimension[dimension],
      };
    });

  const selectedQuestions = [];
  const usedQuestionIds = new Set();
  const pickUniqueQuestion = (dimension) => {
    if (!dimension) return null;

    // Filter out questions already selected
    const availableQuestions = dimension.questions.filter((q) => !usedQuestionIds.has(q.id));

    if (availableQuestions.length === 0) return null;

    // Pick a random question from the available list
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];

    selectedQuestions.push({ ...question, high: dimension.average >= 3 });
    usedQuestionIds.add(question.qid);
    return question;
  };

  // Rule 1: Pick at most 2 questions of different dimensions in high score band
  let highPicks = 0;
  for (let i = 0; i < highScoreQuestionByDim.length; i += 1) {
    const dim = highScoreQuestionByDim[i];
    if (highPicks < 2) {
      if (pickUniqueQuestion(dim)) {
        highPicks += 1;
      }
    } else {
      break; // Stop after two unique dimensions are processed
    }
  }

  // Rule 2: Pick 1 question in low score band (starting from the lowest one), if there's any.
  const lowestLowDim = lowScoreQuestionByDim[0];
  if (lowestLowDim) {
    pickUniqueQuestion(lowestLowDim);
  }
  return selectedQuestions;
}

// Generate pages with all questions using RATING type
const pages = questions.map((question) => ({
  elements: [
    {
      type: 'rating',
      name: question.qid.toString(),
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
  const [scores, setScores] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(null);
  // Apply mobile-friendly settings
  // survey.showNavigationButtons = 'top';
  survey.widthMode = 'responsive';

  // Handle survey completion
  const onComplete = useCallback((sender) => {
    // Calculate dimension scores
    // const mSenderData = {
    //   1: 3,
    //   2: 2,
    //   3: 2,
    //   4: 3,
    //   5: 4,
    //   6: 2,
    //   7: 3,
    //   8: 3,
    //   9: 2,
    //   10: 4,
    //   11: 5,
    //   12: 5,
    //   13: 3,
    //   14: 2,
    //   15: 3,
    //   16: 2,
    //   17: 4,
    //   18: 4,
    //   19: 4,
    //   20: 1,
    //   21: 1,
    //   22: 1,
    //   23: 2,
    //   24: 4,
    //   25: 4,
    //   26: 4,
    //   27: 5,
    //   28: 1,
    //   29: 3,
    //   30: 3,
    //   31: 3,
    //   32: 3,
    //   33: 2,
    //   34: 4,
    //   35: 4,
    //   36: 4,
    //   37: 4,
    //   38: 4,
    //   39: 3,
    //   40: 3,
    //   41: 3,
    //   42: 4,
    //   43: 4,
    //   44: 5,
    //   45: 5,
    //   46: 1,
    //   47: 2,
    //   48: 2,
    //   49: 3,
    //   50: 2,
    //   51: 1,
    //   52: 4,
    //   53: 4,
    //   54: 4,
    //   55: 1,
    //   56: 1,
    //   57: 2,
    //   58: 3,
    // };
    // console.log(mSender.data);
    const { scoreByDimension, groupByDimension } = calculateAllScores(sender.data);
    const sortedScore = Object.entries(scoreByDimension).sort(([, v1], [, v2]) => v2 - v1);
    setScores(sortedScore);
    const selectedQuesions = selectQuestionsByScoreBands(sortedScore, groupByDimension);
    setSelectedQuestions(selectedQuesions);
    setIsComplete(true);
  }, []);

  survey.onComplete.add(onComplete);

  return (
    <div className="scale-page">
      {isComplete ? (
        <CompletePage scores={scores} selectedQuestions={selectedQuestions} />
      ) : (
        <Survey model={survey} />
      )}
    </div>
  );
};

const CompletePage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { scores, selectedQuestions } = props;
  const highScore = selectedQuestions.filter((q) => q.high);
  const lowScore = selectedQuestions.filter((q) => !q.high);
  return (
    <div style={{ padding: 16 }}>
      {scores.map(([dimension, score]) => (
        <div>
          {DIMENSION_TEXT[dimension]}: {score.toFixed(2)}
        </div>
      ))}
      <br />
      <br />
      {highScore.length > 0 && (
        <>
          <h4>高分</h4>
          <br />
          {highScore.map((q) => (
            <div>{q.highScoreText}</div>
          ))}
          <br />
          <br />
        </>
      )}
      <h4>低分</h4>
      <br />
      {lowScore.map((q) => (
        <div>{q.lowScoreText}</div>
      ))}
      <br />
      <br />
      {highScore.length > 0 && (
        <>
          <h4>亮点</h4>
          {highScore.slice(0, 2).map((s) => (
            <>
              <br />
              <div>{COMPLIMENTS[s.dimension][0]}</div>
            </>
          ))}
          <br />
          <br />
        </>
      )}
      {lowScore.length > 0 && (
        <>
          <h4>建议</h4>
          <br />

          <div>{SUGGESTIONS[lowScore[0].dimension][0]}</div>
        </>
      )}
    </div>
  );
};

export default ScalePage;
