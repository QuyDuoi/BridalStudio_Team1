// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Bar, CartesianChart } from "victory-native"
// import { LinearGradient, useFont, vec } from "@shopify/react-native-skia"

// const ThongKeTest = () => {
//     // const font = useFont(inter, 12)
//     const data = Array.from({ length: 7 }, (_, index) => ({
//         month: index + 1,
//         listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50, // số lượng doanh thu 1 ngày
//     }))
//     return (
//         <CartesianChart
//             data={data}
//             xKey="month"
//             yKeys={["listenCount"]}
//             domainPadding={{ left: 50, right: 50, top: 30 }}
//             axisOptions={{
                
//                 formatXLabel(value) {
//                     const date = new Date(2023, value - 1)
//                     return date.toLocaleString("default", { month: "short" })
//                 },
//             }}
//         >
//             {({ points, chartBounds }) => (
//                 <Bar
                    
//                     chartBounds={chartBounds}
//                     points={points.listenCount}
//                     roundedCorners={{
//                         topLeft: 20,
//                         topRight: 20,
//                     }}
//                 >
//                     <LinearGradient
//                         start={vec(10,10)}
//                         end={vec(0, 500)}
//                         colors={["#FEE280", "#FEE280"]}
//                     />
//                 </Bar>
//             )}
//         </CartesianChart>
//     )
// }

// export default ThongKeTest

// const styles = StyleSheet.create({})




import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThongKeTest = () => {
  return (
    <View>
      <Text>ThongKeTest</Text>
    </View>
  )
}

export default ThongKeTest

const styles = StyleSheet.create({})