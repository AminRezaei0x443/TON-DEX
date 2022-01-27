import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import SwapChart from "../components/SwapChart";
import { store } from "../redux/store";


export default {
  title: "Swap Chart",
  component: SwapChart,
  decorators: [(story) => (<Provider store={store}>{story()}</Provider>)]
} as ComponentMeta<typeof SwapChart>;

const Template: ComponentStory<typeof SwapChart> = () => <SwapChart />;

export const Primary = Template.bind({});
Primary.args = {};

