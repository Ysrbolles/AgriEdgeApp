/// <reference types="react" />
import { ViewStyle } from "react-native";
import AbstractChart, { AbstractChartConfig, AbstractChartProps } from "./AbstractChart";
export interface StackedBarChartData {
    labels: string[];
    legend: string[];
    data: number[][];
    barColors: string[];
}
export interface StackedBarChartProps extends AbstractChartProps {
    /**
     * E.g.
     * ```javascript
     * const data = {
     *   labels: ["Test1", "Test2"],
     *   legend: ["L1", "L2", "L3"],
     *   data: [[60, 60, 60], [30, 30, 60]],
     *   barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
     * };
     * ```
     */
    data: StackedBarChartData;
    width: number;
    height: number;
    chartConfig: AbstractChartConfig;
    hideLegend: boolean;
    style?: Partial<ViewStyle>;
    barPercentage?: number;
    decimalPlaces?: number;
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
}
declare type StackedBarChartState = {};
declare class StackedBarChart extends AbstractChart<StackedBarChartProps, StackedBarChartState> {
    getBarPercentage: () => number;
    getBarRadius: (ret: string | any[], x: string | any[]) => number;
    renderBars: ({ data, width, height, paddingTop, paddingRight, border, colors, stackedBar }: Pick<Pick<AbstractChartConfig, "color" | "style" | "height" | "width" | "propsForBackgroundLines" | "propsForLabels" | "labelColor" | "count" | "paddingTop" | "paddingRight" | "horizontalLabelRotation" | "formatYLabel" | "labels" | "horizontalOffset" | "stackedBar" | "verticalLabelRotation" | "formatXLabel" | "backgroundColor" | "backgroundGradientFrom" | "backgroundGradientFromOpacity" | "backgroundGradientTo" | "backgroundGradientToOpacity" | "fillShadowGradient" | "fillShadowGradientOpacity" | "useShadowColorFromDataset" | "strokeWidth" | "barPercentage" | "barRadius" | "propsForDots" | "decimalPlaces" | "linejoinType" | "scrollableDotFill" | "scrollableDotStrokeColor" | "scrollableDotStrokeWidth" | "scrollableDotRadius" | "scrollableInfoViewStyle" | "scrollableInfoTextStyle" | "scrollableInfoTextDecorator" | "scrollableInfoOffset" | "scrollableInfoSize">, "height" | "width" | "paddingTop" | "paddingRight" | "stackedBar"> & {
        border: number;
        colors: string[];
        data: number[][];
    }) => any[][];
    renderLegend: ({ legend, colors, width, height }: Pick<AbstractChartConfig, "height" | "width"> & {
        legend: string[];
        colors: string[];
    }) => JSX.Element[];
    render(): JSX.Element;
}
export default StackedBarChart;
//# sourceMappingURL=StackedBarChart.d.ts.map