/// <reference types="react" />
import { ViewStyle } from "react-native";
import AbstractChart, { AbstractChartConfig, AbstractChartProps } from "./AbstractChart";
import { ChartData } from "./HelperTypes";
export interface BarChartProps extends AbstractChartProps {
    data: ChartData;
    width: number;
    height: number;
    fromZero?: boolean;
    withInnerLines?: boolean;
    yAxisLabel: string;
    yAxisSuffix: string;
    chartConfig: AbstractChartConfig;
    style?: Partial<ViewStyle>;
    horizontalLabelRotation?: number;
    verticalLabelRotation?: number;
    /**
     * Show vertical labels - default: True.
     */
    withVerticalLabels?: boolean;
    /**
     * Show horizontal labels - default: True.
     */
    withHorizontalLabels?: boolean;
    /**
     * The number of horizontal lines
     */
    segments?: number;
    showBarTops?: boolean;
    showValuesOnTopOfBars?: boolean;
}
declare type BarChartState = {};
declare class BarChart extends AbstractChart<BarChartProps, BarChartState> {
    getBarPercentage: () => number;
    renderBars: ({ data, width, height, paddingTop, paddingRight, barRadius }: Pick<Pick<AbstractChartConfig, "color" | "style" | "height" | "width" | "propsForBackgroundLines" | "propsForLabels" | "labelColor" | "count" | "paddingTop" | "paddingRight" | "horizontalLabelRotation" | "formatYLabel" | "labels" | "horizontalOffset" | "stackedBar" | "verticalLabelRotation" | "formatXLabel" | "backgroundColor" | "backgroundGradientFrom" | "backgroundGradientFromOpacity" | "backgroundGradientTo" | "backgroundGradientToOpacity" | "fillShadowGradient" | "fillShadowGradientOpacity" | "useShadowColorFromDataset" | "strokeWidth" | "barPercentage" | "barRadius" | "propsForDots" | "decimalPlaces" | "linejoinType" | "scrollableDotFill" | "scrollableDotStrokeColor" | "scrollableDotStrokeWidth" | "scrollableDotRadius" | "scrollableInfoViewStyle" | "scrollableInfoTextStyle" | "scrollableInfoTextDecorator" | "scrollableInfoOffset" | "scrollableInfoSize">, "height" | "width" | "paddingTop" | "paddingRight" | "barRadius"> & {
        data: number[];
    }) => JSX.Element[];
    renderBarTops: ({ data, width, height, paddingTop, paddingRight }: Pick<Pick<AbstractChartConfig, "color" | "style" | "height" | "width" | "propsForBackgroundLines" | "propsForLabels" | "labelColor" | "count" | "paddingTop" | "paddingRight" | "horizontalLabelRotation" | "formatYLabel" | "labels" | "horizontalOffset" | "stackedBar" | "verticalLabelRotation" | "formatXLabel" | "backgroundColor" | "backgroundGradientFrom" | "backgroundGradientFromOpacity" | "backgroundGradientTo" | "backgroundGradientToOpacity" | "fillShadowGradient" | "fillShadowGradientOpacity" | "useShadowColorFromDataset" | "strokeWidth" | "barPercentage" | "barRadius" | "propsForDots" | "decimalPlaces" | "linejoinType" | "scrollableDotFill" | "scrollableDotStrokeColor" | "scrollableDotStrokeWidth" | "scrollableDotRadius" | "scrollableInfoViewStyle" | "scrollableInfoTextStyle" | "scrollableInfoTextDecorator" | "scrollableInfoOffset" | "scrollableInfoSize">, "height" | "width" | "paddingTop" | "paddingRight"> & {
        data: number[];
    }) => JSX.Element[];
    renderValuesOnTopOfBars: ({ data, width, height, paddingTop, paddingRight }: Pick<Pick<AbstractChartConfig, "color" | "style" | "height" | "width" | "propsForBackgroundLines" | "propsForLabels" | "labelColor" | "count" | "paddingTop" | "paddingRight" | "horizontalLabelRotation" | "formatYLabel" | "labels" | "horizontalOffset" | "stackedBar" | "verticalLabelRotation" | "formatXLabel" | "backgroundColor" | "backgroundGradientFrom" | "backgroundGradientFromOpacity" | "backgroundGradientTo" | "backgroundGradientToOpacity" | "fillShadowGradient" | "fillShadowGradientOpacity" | "useShadowColorFromDataset" | "strokeWidth" | "barPercentage" | "barRadius" | "propsForDots" | "decimalPlaces" | "linejoinType" | "scrollableDotFill" | "scrollableDotStrokeColor" | "scrollableDotStrokeWidth" | "scrollableDotRadius" | "scrollableInfoViewStyle" | "scrollableInfoTextStyle" | "scrollableInfoTextDecorator" | "scrollableInfoOffset" | "scrollableInfoSize">, "height" | "width" | "paddingTop" | "paddingRight"> & {
        data: number[];
    }) => JSX.Element[];
    render(): JSX.Element;
}
export default BarChart;
//# sourceMappingURL=BarChart.d.ts.map