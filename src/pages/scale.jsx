// src/pages/scale.tsx
import React, { useCallback } from 'react';
import { Model, Serializer } from 'survey-core';
import { Survey } from 'survey-react-ui';
import './scale.css';

// Add custom score property to choice options
Serializer.addProperty('itemvalue', {
  name: 'score:number',
});

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

// Survey JSON configuration with all 44 questions
const surveyJson = {
  title: 'ASK-A 家长性格特质及色彩测评',
  description:
    '前言：下面是一些描述个人性格特质的句子，请根据每个句子与您本人特征的符合程度来打分。',
  showProgressBar: 'top',
  progressBarType: 'buttons',
  showQuestionNumbers: 'on',
  questionsOnPageMode: 'singlePage',
  firstPageIsStarted: false,
  startSurveyText: '开始测评',
  pagePrevText: '上一题',
  pageNextText: '下一题',
  completeText: '提交',
  pages: [
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q1',
          title: '我通常很难遵守，喜欢主动打破人大惊天。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q2',
          title: '我容易对别人的生活毁，对人不太关心。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q3',
          title: '我会认真把事情按己应做好。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q4',
          title: '我很难反应过较强烈，压力一来就容易冲动。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q5',
          title: '我有双重性格诱导事情，也会嵌入新恩法。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q6',
          title: '我通常比较努默，不太主动说话。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q7',
          title: '我通常很敏感，对别人有耐心。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q8',
          title: '我有时会不大尺，做事不够仔细。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q9',
          title: '我在压力下也能保持平静，很少慌张或冲动。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q10',
          title: '我喜欢过生活老样，有变化。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q11',
          title: '我通常精力充沛，做事有活力。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q12',
          title: '我通常能够体谅别人，愿意照顾他人感受。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q13',
          title: '我在工作或任务中总是尽责。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q14',
          title: '我容易紧张，对事情比较敏感。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q15',
          title: '我喜欢阅读，思考，温柔心灵成长。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q16',
          title: '我常常表现退缩情绪，对人友好。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q17',
          title: '我认为别人人情得世，很少怀疑他人。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q18',
          title: '我做事比较自由无三连串，不爱有组织性。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q19',
          title: '我通常情绪稳定，不容易烦恼。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q20',
          title: '我常常去想些事情的来来意义。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q21',
          title: '我做事经常主动的玩，不太爱出去。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q22',
          title: '我常常乐于助人，愿意花时间帮助别人。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q23',
          title: '我习惯周围计划后才开始行动。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q24',
          title: '我经常担心心事情，会焦虑。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q25',
          title: '我有丰富的想象力，对新事物感兴趣。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q26',
          title: '我在需要的时刻能够控制外部，开朗。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q27',
          title: '我对人多较人都很落实心怀，不太关心他人需求。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q28',
          title: '我会坚持把一件事做好，不轻易放弃。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q29',
          title: '我通常比较为别把感恩思考或不安。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q30',
          title: '我喜欢学习新知识，对世界充满好奇。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q31',
          title: '我喜欢交朋的主管，享受成为焦点。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q32',
          title: '我对人多较人都有有礼貌，会尊重他人感受。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q33',
          title: '我做事通常很有条理，讲究条理。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q34',
          title: '我在面对挫败时仍然保持冷静。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q35',
          title: '我更喜欢按照既定方式做事，不太喜易改变。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q36',
          title: '我通常比较安静，不喜欢太多人面前发言。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q37',
          title: '我有时会对人冷漠或严厉。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q38',
          title: '我有时做事情很随意，不太按主要来。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q39',
          title: '我有时会因为高兴而忘记不爽伤心。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q40',
          title: '我喜欢探索艺术，文化或创意活动。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q41',
          title: '我对最后结果较体不太感兴趣。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q42',
          title: '我愿意与别人合作，喜欢一起完成事情。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q43',
          title: '我处理任何时答易分心，容易乱。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          type: 'radiogroup',
          name: 'q44',
          title: '我对哲学，思考类问题不太感兴趣。',
          isRequired: true,
          choices: [
            { value: 1, text: '从不' },
            { value: 2, text: '很少' },
            { value: 3, text: '有时' },
            { value: 4, text: '经常' },
            { value: 5, text: '总是' },
          ],
        },
      ],
    },
  ],
  completedHtml: `
    <div class="results-container">
      <h2>测评结果</h2>
      <p>感谢您完成测评！以下是您的得分：</p>
      <div class="score-grid">
        <div class="score-item">
          <span class="score-label">求知力</span>
          <span class="score-value">{demandScore}</span>
        </div>
        <div class="score-item">
          <span class="score-label">社交力</span>
          <span class="score-value">{socialScore}</span>
        </div>
        <div class="score-item">
          <span class="score-label">自控性</span>
          <span class="score-value">{autonomyScore}</span>
        </div>
        <div class="score-item">
          <span class="score-label">情绪调节力</span>
          <span class="score-value">{adjustmentScore}</span>
        </div>
        <div class="score-item">
          <span class="score-label">合作力</span>
          <span class="score-value">{cooperationScore}</span>
        </div>
      </div>
    </div>
  `,
};

const ScalePage = () => {
  const survey = new Model(surveyJson);

  // Apply mobile-friendly settings
  survey.showNavigationButtons = 'top';
  survey.widthMode = 'responsive';

  // Handle survey completion
  const onComplete = useCallback((sender) => {
    // Calculate dimension scores
    const scores = calculateAllScores(sender);

    // Add scores to survey data for display in completedHtml
    sender.setValue('demandScore', scores.demand.toFixed(2));
    sender.setValue('socialScore', scores.social.toFixed(2));
    sender.setValue('autonomyScore', scores.autonomy.toFixed(2));
    sender.setValue('adjustmentScore', scores.adjustment.toFixed(2));
    sender.setValue('cooperationScore', scores.cooperation.toFixed(2));

    // Optional: Send results to your backend
    console.log('Survey Results:', sender.data);
    console.log('Dimension Scores:', scores);

    // Example: Send to backend
    // fetch('/api/save-results', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     answers: sender.data,
    //     scores: scores,
    //     timestamp: new Date().toISOString()
    //   })
    // });
  }, []);

  survey.onComplete.add(onComplete);

  return (
    <div className="scale-page">
      <Survey model={survey} />
    </div>
  );
};

export default ScalePage;
