import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import PercentageSelector from "../components/PercentageSelector";

function Wrapper() {
  const [value, setValue] = useState(0);
  return <PercentageSelector value={value} onChange={setValue}/>;
}

export default {
  title: "Percentage Selector",
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = () => <Wrapper />;

export const Primary = Template.bind({});
Primary.args = {};