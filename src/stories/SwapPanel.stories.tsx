import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {Provider} from "react-redux";
import SwapPanel from "../components/SwapPanel";
import {store} from "../redux/store";


export default {
  title: "Swap Panel",
  component: SwapPanel,
  decorators: [(story) => (<Provider store={store}>{story()}</Provider>)]
} as ComponentMeta<typeof SwapPanel>;

const Template: ComponentStory<typeof SwapPanel> = () => <SwapPanel />;

export const Primary = Template.bind({});
Primary.args = {};
