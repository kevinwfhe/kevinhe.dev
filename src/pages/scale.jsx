/* eslint-disable react/prop-types */
// src/pages/scale.tsx
import React, { useCallback, useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import groupBy from 'lodash/groupBy';
import questions from '../ask/scale';
import { DIMENSION_TEXT, CATEGORY } from '../ask/const';
import SUGGESTIONS from '../ask/suggestion';
import COMPLIMENTS from '../ask/compliment';
import { generateSummary } from '../ask/summary';
import './scale.css';

// Helper function to calculate total score for a dimension
function calculateDimensionScore(dimensionQuestions) {
  let totalScore = 0;
  let count = 0;
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

  // // Prefill with random answers for testing
  // const randomData = questions.reduce((acc, q) => {
  //   acc[q.qid.toString()] = Math.floor(Math.random() * 5) + 1;
  //   return acc;
  // }, {});
  // survey.data = randomData;

  const [isComplete, setIsComplete] = useState(false);
  const [scores, setScores] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(null);
  const [summary, setSummary] = useState(null);
  // Apply mobile-friendly settings
  // survey.showNavigationButtons = 'top';
  survey.widthMode = 'responsive';

  // Handle survey completion
  const onComplete = useCallback((sender) => {
    // Calculate dimension scores
    const { scoreByDimension, groupByDimension } = calculateAllScores(sender.data);
    const sortedScore = Object.entries(scoreByDimension).sort(([, v1], [, v2]) => v2 - v1);
    setScores(sortedScore);
    const selectedQuesions = selectQuestionsByScoreBands(sortedScore, groupByDimension);
    setSelectedQuestions(selectedQuesions);
    // Generate summary
    const generatedSummary = generateSummary(scoreByDimension);
    setSummary(generatedSummary);
    setIsComplete(true);
  }, []);

  survey.onComplete.add(onComplete);

  return (
    <div className="scale-page">
      {isComplete ? (
        <CompletePage scores={scores} selectedQuestions={selectedQuestions} summary={summary} />
      ) : (
        <Survey model={survey} />
      )}
    </div>
  );
};

const CATEGORY_NAMES = {
  A: '性格特质',
  S: '教养风格',
  K: '孩子气质',
};

const CATEGORY_COLORS = {
  A: '#8884d8',
  S: '#82ca9d',
  K: '#ffc658',
};

const HIGHER_LOWER_SCORE_TEXT = {
  higher: '偏高',
  lower: '偏低',
};

const CompletePage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { scores, selectedQuestions, summary } = props;
  const highScore = selectedQuestions.filter((q) => q.high);
  const lowScore = selectedQuestions.filter((q) => !q.high);
  console.log(highScore, lowScore);

  // Transform scores by category for radar charts
  const getRadarDataByCategory = (categoryKey) => {
    const dimensions = CATEGORY[categoryKey];
    return dimensions.map((dim) => {
      const scoreEntry = scores.find(([d]) => d === dim);
      return {
        dimension: DIMENSION_TEXT[dim] || dim,
        score: scoreEntry ? parseFloat(scoreEntry[1].toFixed(2)) : 0,
        fullMark: 5,
      };
    });
  };

  // Get scores by category for display
  const getScoresByCategory = (categoryKey) => {
    const dimensions = CATEGORY[categoryKey];
    return dimensions.map((dim) => {
      const scoreEntry = scores.find(([d]) => d === dim);
      return {
        dimension: DIMENSION_TEXT[dim] || dim,
        score: scoreEntry ? scoreEntry[1] : 0,
      };
    });
  };

  return (
    <div className="result-page">
      <h2 className="result-header">ASK ME 亲子匹配测评报告</h2>
      <div className="result-container">
        {/* Left Column: 测评结果 */}
        <div className="result-column">
          <h3 className="result-column-header">测评结果</h3>

          {/* ASK-A: Radar Chart */}
          <div className="chart-section">
            <h5>ASK-A {CATEGORY_NAMES.A}</h5>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getRadarDataByCategory('A')}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9 }} />
                <Radar
                  name="得分"
                  dataKey="score"
                  stroke={CATEGORY_COLORS.A}
                  fill={CATEGORY_COLORS.A}
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ marginBottom: 12 }}>
              <strong>{CATEGORY_NAMES.A}</strong>
              <div className="score-list">
                {getScoresByCategory('A').map((item) => (
                  <div key={item.dimension} className="score-list-item">
                    <span className="label">{item.dimension}</span>
                    <span className="value">{item.score.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ASK-S: Radar Chart */}
          <div className="chart-section">
            <h5>ASK-S {CATEGORY_NAMES.S}</h5>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getRadarDataByCategory('S')}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9 }} />
                <Radar
                  name="得分"
                  dataKey="score"
                  stroke={CATEGORY_COLORS.S}
                  fill={CATEGORY_COLORS.S}
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ marginBottom: 12 }}>
              <strong>{CATEGORY_NAMES.S}</strong>
              <div className="score-list">
                {getScoresByCategory('S').map((item) => (
                  <div key={item.dimension} className="score-list-item">
                    <span className="label">{item.dimension}</span>
                    <span className="value">{item.score.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ASK-K: Radar Chart */}
          <div className="chart-section">
            <h5>ASK-K {CATEGORY_NAMES.K}</h5>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getRadarDataByCategory('K')}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9 }} />
                <Radar
                  name="得分"
                  dataKey="score"
                  stroke={CATEGORY_COLORS.K}
                  fill={CATEGORY_COLORS.K}
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ marginBottom: 12 }}>
              <strong>{CATEGORY_NAMES.K}</strong>
              <div className="score-list">
                {getScoresByCategory('K').map((item) => (
                  <div key={item.dimension} className="score-list-item">
                    <span className="label">{item.dimension}</span>
                    <span className="value">{item.score.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 综合解读 */}
        <div className="result-column">
          <h3 className="result-column-header">综合解读</h3>

          {/* 测评结果基础解读 */}
          <div className="interpretation-section">
            <h5>测评结果基础解读</h5>
            {highScore.length > 0 && (
              <ul>
                {highScore.map((s) => (
                  <li key={s.qid}>
                    {`${DIMENSION_TEXT[s.dimension]}${HIGHER_LOWER_SCORE_TEXT.higher}: ${
                      s.highScoreText
                    }`}
                  </li>
                ))}
              </ul>
            )}
            {lowScore.length > 0 && (
              <ul>
                {lowScore.map((s) => (
                  <li key={s.qid}>
                    {`${DIMENSION_TEXT[s.dimension]}${HIGHER_LOWER_SCORE_TEXT.lower}: ${
                      s.lowScoreText
                    }`}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 亮点&建议 */}
          <div className="interpretation-section">
            <h5>亮点 & 建议</h5>
            <ul>
              {highScore.length > 0 &&
                highScore
                  .slice(0, 2)
                  .map((s) => <li key={s.dimension}>{COMPLIMENTS[s.dimension]?.[0]}</li>)}
              {lowScore.length > 0 &&
                lowScore.map((s) => <li key={s.dimension}>{SUGGESTIONS[s.dimension]?.[0]}</li>)}
            </ul>
          </div>

          {/* 总结 */}
          {summary && (
            <div className="interpretation-section">
              <h5>总结</h5>
              <p>
                {summary.partA} {summary.partB?.text}
              </p>
              {summary.partC && <p>{summary.partC}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScalePage;
