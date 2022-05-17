import React from 'react';
import renderer from 'react-test-renderer';
import AppText from './components/AppText';
import AppButton from './components/AppButton';
import StyleText from './components/StyleText';
import ValidationMessage from './components/ValidationMessage';
import ColorPicker from './config/ColorPicker';
import FilterView from './components/FilterView';

test("AppText has correct font family and size", () => {
    const json = renderer.create(<AppText />).toJSON();
    expect(json.props.style.fontSize).toBe(20);
    expect(json.props.style.fontFamily).toBe('Roboto');
});

test("AppText renders text correctly", () => {
    const json = renderer.create(<AppText>Some text is here!</AppText>).toJSON();
    expect(json.props.style.fontSize).toBe(20);
    expect(json.props.style.fontFamily).toBe('Roboto');
    expect(json.children.includes("Some text is here!"));
});

test("StyleText renders text correctly", () => {
    const json = renderer.create(<StyleText>Welcome to memorybook!</StyleText>).toJSON();
    expect(json.children.includes("Welcome to memorybook!"));
    expect(json.children[0].props.style.fontFamily).toBe('Roboto');
    expect(json.children[0].props.style.fontSize).toBe(25);
});

test("Register button renders correctly", () => {
    const json = renderer.create(
        <AppButton 
            title="Register"
            onPress={() => navigation.navigate("Register")}
            color="otherColor2"
        />).toJSON();
    expect(json.children[0].children.includes('Register'));
    expect(json.children[0].props.style[1].backgroundColor).toBe('#8C8C9C');
    expect(json.children[0].props.style[0].borderRadius).toBe(15);
});

test("Login button renders correctly", () => {
    const json = renderer.create(
        <AppButton 
            title="Login"
            onPress={() => navigation.navigate("Login")}
        />).toJSON();
    expect(json.children[0].children.includes('Login'));
    expect(json.children[0].props.style.backgroundColor).toBe('#BBB6A5');
    expect(json.children[0].props.style.borderRadius).toBe(15);
});

test("Validation error message renders text correctly", () => {
    const json = renderer.create(<ValidationMessage text="Error message goes here" />).toJSON();
    // console.log(json);
    // console.log(json.children[0].children);
    expect(json.children.includes("Error message goes here"));
    expect(json.props.style.backgroundColor).toBe('#F7B0BB');
    expect(json.props.style.borderColor).toBe("#C82333");
});

test("The color scheme is correct", () => {
    const {primaryColor, secondaryColor,
        otherColor1, otherColor2, 
        inActiveColor, offWhite, khaki,
        red} = ColorPicker;
    expect(primaryColor).toBe('#2A2F33');
    expect(secondaryColor).toBe('#BBB6A5');
    expect(otherColor1).toBe('#8C9491');
    expect(otherColor2).toBe('#8C8C9C');
    expect(inActiveColor).toBe('#37414a');
    expect(offWhite).toBe('#f5f5f5');
    expect(khaki).toBe('#B5A197');
    expect(red).toBe('#C82333');
});