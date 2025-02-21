const $ = require('jquery');

require('../../helpers/qunitPerformanceExtension.js');
require('../../content/orders.js');

require('generic_light.css!');
const DataGrid = require('ui/data_grid');
const Pager = require('ui/pager');
const Scrollable = require('ui/scroll_view/ui.scrollable');

const createDataGridMeasureFunction = function(options) {
    return function() {
        const clock = sinon.useFakeTimers();
        $('#container').dxDataGrid(options);
        clock.tick(100);
        clock.restore();
    };
};

QUnit.testStart(function() {
    $('<div id=\'container\'>').appendTo('#qunit-fixture');
});

QUnit.performanceTest('render without data', function(assert) {
    const measureFunction = createDataGridMeasureFunction({
    });

    assert.measureStyleRecalculation(measureFunction, Scrollable.IS_RENOVATED_WIDGET ? 9 : DataGrid.IS_RENOVATED_WIDGET ? 12 : 11);
});

QUnit.performanceTest('render with data', function(assert) {
    const measureFunction = createDataGridMeasureFunction({
        dataSource: window.orders
    });
    assert.measureStyleRecalculation(measureFunction, DataGrid.IS_RENOVATED_WIDGET ? 7 : 6, true);
});

QUnit.performanceTest('render with columnAutoWidth', function(assert) {
    const measureFunction = createDataGridMeasureFunction({
        dataSource: window.orders,
        columnAutoWidth: true
    });

    assert.measureStyleRecalculation(measureFunction, 14);
});

QUnit.performanceTest('render with columnFixing', function(assert) {
    const measureFunction = createDataGridMeasureFunction({
        dataSource: window.orders,
        columnAutoWidth: true,
        columnFixing: {
            legacyMode: true
        },
        customizeColumns: function(columns) {
            columns[0].fixed = true;
        }
    });

    assert.measureStyleRecalculation(measureFunction, 15);
});

QUnit.performanceTest('render with virtual scrolling', function(assert) {
    const measureFunction = createDataGridMeasureFunction({
        height: 300,
        dataSource: window.orders,
        scrolling: { mode: 'virtual' }
    });

    assert.measureStyleRecalculation(measureFunction, Scrollable.IS_RENOVATED_WIDGET ? 12 : 14);
});

QUnit.performanceTest('updateDimensions', function(assert) {
    createDataGridMeasureFunction({
        dataSource: window.orders
    })();

    const measureFunction = createDataGridMeasureFunction('updateDimensions');

    assert.measureStyleRecalculation(measureFunction, 0);
});

QUnit.performanceTest('updateDimensions with columnAutoWidth', function(assert) {
    createDataGridMeasureFunction({
        dataSource: window.orders,
        columnAutoWidth: true
    })();

    const measureFunction = createDataGridMeasureFunction('updateDimensions');

    assert.measureStyleRecalculation(measureFunction, 2);
});

QUnit.performanceTest('updateDimensions with columnFixing', function(assert) {
    createDataGridMeasureFunction({
        dataSource: window.orders,
        columnAutoWidth: true,
        columnFixing: {
            legacyMode: true
        },
        customizeColumns: function(columns) {
            columns[0].fixed = true;
        }
    })();

    const measureFunction = createDataGridMeasureFunction('updateDimensions');

    assert.measureStyleRecalculation(measureFunction, 3);
});

QUnit.performanceTest('updateDimensions with virtual scrolling', function(assert) {
    createDataGridMeasureFunction({
        height: 300,
        dataSource: window.orders,
        scrolling: { mode: 'virtual' }
    })();

    const measureFunction = createDataGridMeasureFunction('updateDimensions');

    assert.measureStyleRecalculation(measureFunction, 1);
});

QUnit.performanceTest('refresh', function(assert) {
    createDataGridMeasureFunction({
        dataSource: window.orders
    })();

    const measureFunction = createDataGridMeasureFunction('refresh');

    assert.measureStyleRecalculation(measureFunction, 2);
});

QUnit.performanceTest('refresh with columnAutoWidth', function(assert) {
    createDataGridMeasureFunction({
        dataSource: window.orders,
        columnAutoWidth: true
    })();

    const measureFunction = createDataGridMeasureFunction('refresh');

    assert.measureStyleRecalculation(measureFunction, 5);
});

QUnit.performanceTest('refresh with columnFixing', function(assert) {
    createDataGridMeasureFunction({
        dataSource: window.orders,
        columnAutoWidth: true,
        columnFixing: {
            legacyMode: true
        },
        customizeColumns: function(columns) {
            columns[0].fixed = true;
        }
    })();

    const measureFunction = createDataGridMeasureFunction('refresh');

    assert.measureStyleRecalculation(measureFunction, 6);
});

QUnit.performanceTest('refresh with virtual scrolling', function(assert) {
    createDataGridMeasureFunction({
        height: 300,
        dataSource: window.orders,
        scrolling: { mode: 'virtual' }
    })();

    const measureFunction = createDataGridMeasureFunction('refresh');

    assert.measureStyleRecalculation(measureFunction, 1);
});
