// import React from 'react';
// import IMP from 'iamport-react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { getUserCode } from './utils';
// import Loading from './Loding';
// import { IMPConst } from 'iamport-react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function Payment({navigation}) {
// // const navigation = useNavigation();
// const params = {
//     pg:"html5_inicis",
//     pay_method: "card",
//     merchant_uid: "test1'",
//     name:"name",
//     amount:10000,
//     app_scheme: 'exampleformanagedexpo',
//     buyer_name: "name",
//     buyer_tel: "010",
//     buyer_email: "@",
//     m_redirect_url: IMPConst.M_REDIRECT_URL,
//   }

//   const userCode = getUserCode(params.pg);

//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
//       <IMP.Payment
//         userCode={userCode}
//         // tierCode={tierCode}
//         loading={<Loading />}
//         data={params}
//         callback={(response) => navigation.replace('PaymentResult', response)}
//       />
//     </SafeAreaView>
//   );
// }
import React from 'react';
import IMP from 'iamport-react-native';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { getUserCode } from './utils';
import { IMPConst } from 'iamport-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Payment({route}) {
  const data = {route}.route.params;
  const navigation = useNavigation();
  const params = {
    pg: "html5_inicis",
    pay_method: "card",
    merchant_uid: `mid_${new Date().getTime()}`,
    name: "테스트 결제",
    amount: data.totalPrice,
    app_scheme: 'exampleformanagedexpo',
    buyer_name: "홍길동",
    buyer_tel: "01012345678",
    buyer_email: "example@example.com",
    m_redirect_url: IMPConst.M_REDIRECT_URL,
  }

  // PG사에 따른 가맹점 식별코드를 가져옵니다. getUserCode 함수는 params.pg를 기준으로 적절한 코드를 반환해야 합니다.
  const userCode = getUserCode(params.pg);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <IMP.Payment
        userCode={userCode}
        loading={<ActivityIndicator size="large" color="#0000ff" />} // ActivityIndicator를 사용하여 로딩 표시
        data={params}
        callback={(response) => navigation.replace('Main')} // 결제 후 응답을 PaymentResult 화면으로 전달
      />
    </SafeAreaView>
  );
}
