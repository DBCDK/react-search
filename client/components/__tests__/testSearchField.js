'use strict'

jest.dontMock('../SearchField.js');

describe('SearchField', function() {
 var React = require('react/addons');
 var SearchField = require('../SearchField.js');
 var TestUtils = React.addons.TestUtils;

 it('Value changes on keystroke', function() {

    // Render a input field in the document
    var field = TestUtils.renderIntoDocument(
     <SearchField initialValue='test' button={false} buttonText='Søg' />
     );

    // Get input field
    var input = TestUtils.findRenderedDOMComponentWithClass(
     field, 'searchfield-input');

    // Verify that value is empty string
    expect(input.getDOMNode().value).toEqual('test');

    // Simulate user input
    TestUtils.Simulate.change(input, {target : {value: 'user input test'}});
    expect(input.getDOMNode().value).toEqual('user input test');

    // Verify no button exists
    expect(TestUtils.scryRenderedDOMComponentsWithClass(field, 'searchfield-button').length).toEqual(0);
 });
 it('Has button', function() {

    // Render a input field in the document
    var field = TestUtils.renderIntoDocument(
     <SearchField button={true} buttonText='Search' />
     );

    // Get input field
    var input = TestUtils.findRenderedDOMComponentWithClass(
     field, 'searchfield-input');

    // Verify that value is empty string
    expect(input.getDOMNode().value).toEqual('');

    // Verify no button exists
    expect(TestUtils.findRenderedDOMComponentWithClass(field, 'searchfield-button').getDOMNode().value).toEqual('Search');
   });
});
