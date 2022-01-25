import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Button from "../components/Button";


export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  buttonType: "primary",
  title:"Primary Button"
};

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  buttonType: "primaryLarge",
  title:"Primary Large Button"
};

export const Secondary = Template.bind({});
Secondary.args = {
  buttonType: "secondary",
  title:"Secondary Button"
};

export const SecondaryLarge = Template.bind({});
SecondaryLarge.args = {
  buttonType: "secondaryLarge",
  title:"Secondary Large Button"
};
export const LoadingButton = Template.bind({});
LoadingButton.args = {
  buttonType: "primary",
  title:"Loading Button",
  loading:true
};