Hooks.on('init', () => {
    // Registra as configurações do módulo
    game.settings.register('kurosawa-mode', 'enabled', {
        name: 'KUROSAWA.ENABLE.NAME',
        hint: 'KUROSAWA.ENABLE.HINT',
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {
            if (value) {
                applyAllEffects();
            } else {
                removeAllEffects();
            }
        }
    });

    game.settings.register('kurosawa-mode', 'blackAndWhite', {
        name: 'KUROSAWA.BLACKWHITE.NAME',
        hint: 'KUROSAWA.BLACKWHITE.HINT',
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {
            if (game.settings.get('kurosawa-mode', 'enabled')) {
                applyFilters();
            }
        }
    });

    game.settings.register('kurosawa-mode', 'filter3dData', {
        name: 'KUROSAWA.FILTER3D.NAME',
        hint: 'KUROSAWA.FILTER3D.HINT',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            if (game.settings.get('kurosawa-mode', 'enabled')) {
                applyFilters();
            }
        }
    });

    game.settings.register('kurosawa-mode', 'brightness', {
        name: 'KUROSAWA.BRIGHTNESS.NAME',
        hint: 'KUROSAWA.BRIGHTNESS.HINT',
        scope: 'client',
        config: true,
        type: Number,
        default: 1.5,
        onChange: value => {
            if (game.settings.get('kurosawa-mode', 'enabled')) {
                applyFilters();
            }
        }
    });

    game.settings.register('kurosawa-mode', 'contrast', {
        name: 'KUROSAWA.CONTRAST.NAME',
        hint: 'KUROSAWA.CONTRAST.HINT',
        scope: 'client',
        config: true,
        type: Number,
        default: 2,
        onChange: value => {
            if (game.settings.get('kurosawa-mode', 'enabled')) {
                applyFilters();
            }
        }
    });

    game.settings.register('kurosawa-mode', 'grainEnabled', {
        name: 'KUROSAWA.GRAINENABLE.NAME',
        hint: 'KUROSAWA.GRAINENABLE.HINT',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            if (game.settings.get('kurosawa-mode', 'enabled')) {
                if (value) {
                    applyGrain();
                } else {
                    removeGrain();
                }
            }
        }
    });
});

Hooks.on('ready', () => {
    applyAllEffects();
});

function applyAllEffects() {
    if (game.settings.get('kurosawa-mode', 'enabled')) {
        applyFilters();
        if (game.settings.get('kurosawa-mode', 'grainEnabled')) {
            applyGrain();
        }
    } else {
        removeAllEffects();
    }
}

function removeAllEffects() {
    removeFilters();
    removeGrain();
}

async function applyFilters() {
    const filtersModule = await import('/modules/kurosawa-mode/scripts/filters.js');
    filtersModule.applyFilters(
        game.settings.get('kurosawa-mode', 'blackAndWhite'),
        game.settings.get('kurosawa-mode', 'filter3dData'),
        game.settings.get('kurosawa-mode', 'brightness'),
        game.settings.get('kurosawa-mode', 'contrast')
    );
}

async function removeFilters() {
    const filtersModule = await import('/modules/kurosawa-mode/scripts/filters.js');
    filtersModule.removeFilters();
}

function applyGrain() {
    import('/modules/kurosawa-mode/scripts/grain.js').then(module => module.applyGrain());
}

function removeGrain() {
    import('/modules/kurosawa-mode/scripts/grain.js').then(module => module.removeGrain());
}