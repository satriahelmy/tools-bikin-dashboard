(function (window, document) {
  'use strict';

  const tree = window.BDChartRecommenderTree;
  const engine = window.BDChartRecommenderEngine;
  const stage = document.getElementById('recommender-stage');
  const announcement = document.getElementById('recommender-announcement');

  if (!stage) return;

  let state = null;

  function sendEvent(eventName, properties) {
    if (typeof window.gtag !== 'function') return;
    try {
      window.gtag('event', eventName, properties || {});
    } catch (error) {
      // Analytics failures must never stop the local recommendation flow.
    }
  }

  function entrySource() {
    if (!document.referrer) return 'direct';
    try {
      const referrer = new URL(document.referrer);
      if (referrer.origin !== window.location.origin) return 'external';
      if (/\/chart\/?$/.test(referrer.pathname) || /\/chart\/index\.html$/.test(referrer.pathname)) return 'chart-guide';
      if (referrer.pathname === '/' || /\/index\.html$/.test(referrer.pathname)) return 'home';
      return 'internal';
    } catch (error) {
      return 'direct';
    }
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  }

  function focusHeading(heading) {
    window.requestAnimationFrame(() => heading?.focus({ preventScroll: true }));
  }

  function decorateRender() {
    stage.setAttribute('aria-busy', 'false');
    stage.classList.remove('is-entering');
    void stage.offsetWidth;
    stage.classList.add('is-entering');
  }

  function addNavigation(container, options) {
    if (options.back) {
      const backButton = makeElement('button', 'bd-recommender-action', '← Kembali');
      backButton.type = 'button';
      backButton.addEventListener('click', () => {
        const nextState = engine.back(state);
        if (nextState) {
          state = nextState;
          renderQuestion(true);
        }
      });
      container.appendChild(backButton);
    } else if (options.edit) {
      const editButton = makeElement('button', 'bd-recommender-action', '← Ubah jawaban');
      editButton.type = 'button';
      editButton.addEventListener('click', () => {
        const nextState = engine.editLatestAnswer(state);
        if (nextState) {
          state = nextState;
          renderQuestion(true);
        }
      });
      container.appendChild(editButton);
    }

    if (options.restart) {
      const restartButton = makeElement('button', 'bd-recommender-action bd-recommender-restart', options.restartLabel || 'Mulai dari awal');
      restartButton.type = 'button';
      restartButton.addEventListener('click', restart);
      container.appendChild(restartButton);
    }
  }

  function renderQuestion(animate) {
    const question = engine.currentQuestion(state);
    if (!question) {
      renderFallback('Belum menemukan rekomendasi yang cocok. Coba mulai lagi dan pilih jawaban yang paling mendekati kebutuhanmu.');
      return;
    }

    stage.replaceChildren();
    stage.classList.toggle('is-entering', Boolean(animate));

    const header = makeElement('header', 'bd-recommender-question-header');
    const context = makeElement('p', 'bd-recommender-context', question.context);
    const title = makeElement('h2', 'bd-recommender-question-title', question.question);
    title.id = 'question-title';
    title.tabIndex = -1;
    header.append(context, title);
    if (question.helper) header.appendChild(makeElement('p', 'bd-recommender-helper', question.helper));
    stage.appendChild(header);

    const choices = makeElement('div', 'bd-recommender-choices');
    choices.setAttribute('role', 'group');
    choices.setAttribute('aria-labelledby', title.id);

    question.answers.forEach((answer) => {
      const choice = makeElement('button', 'bd-recommender-choice');
      choice.type = 'button';
      choice.setAttribute('aria-pressed', String(state.answers[question.id] === answer.id));

      const label = makeElement('span', 'bd-recommender-choice-label', answer.label);
      choice.appendChild(label);
      if (answer.helper) choice.appendChild(makeElement('span', 'bd-recommender-choice-helper', answer.helper));

      choice.addEventListener('click', () => choose(question, answer));
      choices.appendChild(choice);
    });
    stage.appendChild(choices);

    const navigation = makeElement('nav', 'bd-recommender-navigation');
    navigation.setAttribute('aria-label', 'Navigasi pertanyaan');
    addNavigation(navigation, {
      back: engine.hasBack(state),
      restart: state.started && question.id !== tree.rootId
    });
    if (navigation.childElementCount) stage.appendChild(navigation);

    decorateRender();
    if (animate) focusHeading(title);
  }

  function addResultSection(container, headingText, content, list) {
    if (!content || (Array.isArray(content) && content.length === 0)) return;
    const section = makeElement('section', 'bd-recommender-result-section');
    section.appendChild(makeElement('h3', '', headingText));
    if (list) {
      const items = makeElement('ul', 'bd-recommender-tips');
      content.forEach((item) => items.appendChild(makeElement('li', '', item)));
      section.appendChild(items);
    } else {
      section.appendChild(makeElement('p', '', content));
    }
    container.appendChild(section);
  }

  function recommendedChartValue(result) {
    if (result.guideId) return result.guideId;
    return result.recommended.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function renderResult(result) {
    stage.replaceChildren();
    const article = makeElement('article', 'bd-recommender-result');
    article.setAttribute('aria-labelledby', 'result-title');
    article.appendChild(makeElement('p', 'bd-recommender-result-label', 'Rekomendasi'));

    const title = makeElement('h2', 'bd-recommender-result-title', result.recommended.name);
    title.id = 'result-title';
    title.tabIndex = -1;
    article.appendChild(title);
    if (result.recommended.variant) {
      article.appendChild(makeElement('p', 'bd-recommender-result-variant', result.recommended.variant));
    }

    addResultSection(article, 'Mengapa cocok', result.why, false);
    addResultSection(article, 'Cara menggunakannya', result.tips, true);
    addResultSection(article, 'Alternatif', result.alternative, false);
    addResultSection(article, 'Perlu diperhatikan', result.watchOut, false);

    if (result.guideId) {
      const guideLink = makeElement('a', 'bd-btn bd-btn-primary bd-recommender-guide', `Buka Panduan ${result.recommended.name} →`);
      guideLink.href = `../chart/chart.html?id=${encodeURIComponent(result.guideId)}`;
      guideLink.addEventListener('click', () => {
        sendEvent('recommender_guide_opened', {
          recommended_chart: result.guideId,
          rule_id: result.ruleId
        });
      });
      article.appendChild(guideLink);
    }

    const navigation = makeElement('nav', 'bd-recommender-navigation bd-recommender-result-navigation');
    navigation.setAttribute('aria-label', 'Aksi rekomendasi');
    addNavigation(navigation, { edit: true, restart: true, restartLabel: 'Coba lagi' });
    article.appendChild(navigation);
    stage.appendChild(article);
    decorateRender();
    focusHeading(title);
    if (announcement) announcement.textContent = `Rekomendasi: ${result.recommended.name}.`;

    sendEvent('recommender_completed', {
      intent: result.rootIntent,
      rule_id: result.ruleId,
      recommended_chart: recommendedChartValue(result),
      question_count: result.questionCount
    });
  }

  function renderFallback(message) {
    stage.replaceChildren();
    const section = makeElement('section', 'bd-recommender-empty');
    const title = makeElement('h2', 'bd-recommender-result-title', 'Belum menemukan rekomendasi yang cocok.');
    title.id = 'fallback-title';
    title.tabIndex = -1;
    section.appendChild(title);
    section.appendChild(makeElement('p', 'bd-recommender-empty-copy', message || 'Coba mulai lagi dan pilih jawaban yang paling mendekati kebutuhanmu.'));

    const restartButton = makeElement('button', 'bd-btn bd-btn-primary', 'Mulai dari awal');
    restartButton.type = 'button';
    restartButton.addEventListener('click', () => {
      if (state) restart();
      else window.location.reload();
    });
    if (!state) restartButton.textContent = 'Muat ulang';
    section.appendChild(restartButton);
    stage.appendChild(section);
    decorateRender();
    focusHeading(title);
  }

  function choose(question, answer) {
    const previousCount = engine.questionCount(state);
    const transition = engine.selectAnswer(state, answer.id);
    state = transition.state || state;
    if (transition.kind === 'fallback') {
      renderFallback(transition.message);
      return;
    }

    if (transition.startedNow) sendEvent('recommender_started', { entry_source: entrySource() });
    if (question.id === tree.rootId) {
      sendEvent('recommender_intent_selected', { intent: transition.intentSelected });
    } else if (question.id !== tree.rootId) {
      sendEvent('recommender_question_answered', {
        question_id: question.id,
        answer_id: answer.id
      });
    }

    if (transition.kind === 'result') {
      renderResult(transition.result);
      return;
    }

    if (announcement && previousCount !== engine.questionCount(state)) {
      announcement.textContent = `Pertanyaan berikutnya: ${transition.question.question}`;
    }
    renderQuestion(true);
  }

  function restart() {
    if (!state) return;
    const result = engine.restart(state);
    state = result.state;
    const previous = result.previous;
    const properties = { previous_intent: previous.intent };
    if (previous.ruleId) properties.previous_rule_id = previous.ruleId;
    sendEvent('recommender_restarted', properties);
    if (announcement) announcement.textContent = 'Wizard dimulai kembali.';
    renderQuestion(true);
  }

  if (!tree || !engine || !tree.questions || !tree.rules) {
    renderFallback('Pertanyaan belum dapat dimuat. Muat ulang halaman atau mulai kembali nanti.');
    return;
  }

  state = engine.createState();
  renderQuestion(false);
})(window, document);
