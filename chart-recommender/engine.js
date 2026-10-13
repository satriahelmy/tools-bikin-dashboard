(function (window) {
  'use strict';

  const tree = window.BDChartRecommenderTree;
  const rootIntentByAnswer = {
    'ROOT-CMP': 'comparison',
    'ROOT-TRD': 'trend',
    'ROOT-DST': 'distribution',
    'ROOT-REL': 'relationship',
    'ROOT-COM': 'composition'
  };

  function createState() {
    return {
      rootIntent: null,
      answers: {},
      history: [tree.rootId],
      result: null,
      started: false
    };
  }

  function cloneState(state) {
    return {
      rootIntent: state.rootIntent,
      answers: { ...state.answers },
      history: state.history.slice(),
      result: state.result,
      started: state.started
    };
  }

  function currentQuestion(state) {
    const questionId = state.history[state.history.length - 1];
    return tree.questions[questionId] || null;
  }

  function hasBack(state) {
    return state.history.length > 1;
  }

  function questionCount(state) {
    return state.history.reduce((count, questionId) => {
      return count + (state.answers[questionId] ? 1 : 0);
    }, 0);
  }

  function makeResult(state, ruleId) {
    const rule = tree.rules[ruleId];
    if (!rule) return null;

    return {
      ruleId: rule.ruleId,
      intent: rule.intent,
      intentLabel: tree.intentLabels[rule.intent] || 'Rekomendasi',
      rootIntent: state.rootIntent,
      recommended: {
        chartId: rule.guide || null,
        name: rule.recommended,
        variant: rule.variant || null
      },
      why: rule.why,
      tips: rule.tips || [],
      alternative: rule.alternative || null,
      watchOut: rule.watchOut || null,
      guideId: rule.guide || null,
      questionCount: questionCount(state)
    };
  }

  function selectAnswer(state, answerId) {
    const question = currentQuestion(state);
    if (!question) return { kind: 'fallback', state, message: 'Pertanyaan tidak tersedia.' };

    const answer = question.answers.find((item) => item.id === answerId);
    if (!answer) return { kind: 'fallback', state, message: 'Pilihan ini sudah tidak tersedia.' };

    const nextState = cloneState(state);
    const currentIndex = nextState.history.length - 1;
    nextState.history.slice(currentIndex + 1).forEach((questionId) => {
      delete nextState.answers[questionId];
    });
    nextState.history = nextState.history.slice(0, currentIndex + 1);
    nextState.answers[question.id] = answer.id;
    nextState.result = null;

    const action = {
      kind: 'question',
      questionId: question.id,
      answerId: answer.id,
      startedNow: false,
      rootIntent: nextState.rootIntent
    };

    if (question.id === tree.rootId) {
      const isFirstIntentSelection = !nextState.started;
      nextState.rootIntent = rootIntentByAnswer[answer.id] || null;
      nextState.started = true;
      action.startedNow = isFirstIntentSelection;
      action.intentSelected = nextState.rootIntent;
      action.rootIntent = nextState.rootIntent;
    }

    const target = answer.next;
    if (tree.rules[target]) {
      const result = makeResult(nextState, target);
      if (!result) return { kind: 'fallback', state: nextState, message: 'Belum menemukan rekomendasi yang cocok.' };
      nextState.result = result;
      return { kind: 'result', state: nextState, result, answer, question, startedNow: action.startedNow };
    }

    if (tree.questions[target]) {
      nextState.history.push(target);
      return { kind: 'question', state: nextState, question: tree.questions[target], answer, sourceQuestion: question, startedNow: action.startedNow };
    }

    return { kind: 'fallback', state: nextState, message: 'Belum menemukan rekomendasi yang cocok.' };
  }

  function back(state) {
    if (!hasBack(state)) return null;
    const nextState = cloneState(state);
    const removedQuestionId = nextState.history.pop();
    delete nextState.answers[removedQuestionId];
    nextState.result = null;
    return nextState;
  }

  function editLatestAnswer(state) {
    if (!state.result) return null;
    const nextState = cloneState(state);
    nextState.result = null;
    return nextState;
  }

  function restart(state) {
    const previous = {
      intent: state.rootIntent,
      ruleId: state.result?.ruleId || null
    };
    return { state: createState(), previous };
  }

  window.BDChartRecommenderEngine = {
    createState,
    cloneState,
    currentQuestion,
    hasBack,
    questionCount,
    selectAnswer,
    back,
    editLatestAnswer,
    restart
  };
})(window);
