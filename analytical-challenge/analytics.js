(function (window, document) {
  'use strict';

  const allowedEvents = new Set([
    'challenge_opened',
    'challenge_dataset_downloaded',
    'challenge_dictionary_opened',
    'challenge_dictionary_downloaded',
    'challenge_share_clicked'
  ]);

  const page = document.body;
  const challengeId = page?.dataset.challengeId || '';
  const challengeSlug = page?.dataset.challengeSlug || '';

  function track(eventName, fileFormat) {
    if (!allowedEvents.has(eventName)) return;
    const parameters = {};
    if (challengeId) parameters.challenge_id = challengeId;
    if (challengeSlug) parameters.challenge_slug = challengeSlug;
    if (fileFormat) parameters.file_format = fileFormat;

    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, parameters);
      }
    } catch (_error) {
      // Analytics must not interrupt page navigation or downloads.
    }
  }

  if (challengeId && challengeSlug) track('challenge_opened');

  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-challenge-event]');
    if (!action) return;
    track(action.dataset.challengeEvent, action.dataset.fileFormat || '');
  });
})(window, document);
