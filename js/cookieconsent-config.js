window.addEventListener('load', function() {
    if (typeof CookieConsent === 'undefined') return;

    CookieConsent.run({
        guiOptions: {
            consentModal: {
                layout: 'box',
                position: 'bottom right',
                equalWeightButtons: true,
                flipButtons: false
            },
            preferencesModal: {
                layout: 'box',
                position: 'right',
                equalWeightButtons: true,
                flipButtons: false
            }
        },
        categories: {
            necessary: {
                readOnly: true
            },
            analytics: {}
        },
        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: "Cookie & Privacy Settings 🍪",
                        description: "This site uses cookies to ensure basic website functionality and gather anonymous analytics.",
                        acceptAllBtn: "Accept All",
                        acceptNecessaryBtn: "Reject Non-Essential",
                        showPreferencesBtn: "Manage Preferences"
                    },
                    preferencesModal: {
                        title: "Manage Cookie Preferences",
                        acceptAllBtn: "Accept All",
                        acceptNecessaryBtn: "Reject Non-Essential",
                        savePreferencesBtn: "Save Preferences",
                        closeIconLabel: "Close",
                        sections: [
                            {
                                title: "Cookie Usage",
                                description: "We use cookies to ensure core site functions and measure site traffic anonymously."
                            },
                            {
                                title: "Strictly Necessary Cookies",
                                description: "Required for basic site operation and security.",
                                category: "necessary"
                            },
                            {
                                title: "Performance & Analytics Cookies",
                                description: "Helps us understand visitor metrics and improve user experience.",
                                category: "analytics"
                            }
                        ]
                    }
                }
            }
        },
        onAccept: function() {
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied'
                });
            }
        },
        onChange: function() {
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied'
                });
            }
        }
    });
});
