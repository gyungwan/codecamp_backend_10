// 휴대폰 인증 토큰 전송하기

const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const myphone =
    document.getElementById("PhoneNumber01").value +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;

  console.log(myphone);
  axios
    .post("http://localhost:3000/tokens/phone", {
      myphone: myphone,
    })
    .then((res) => {
      console.log(res);
    });

  console.log("인증 번호 전송");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const jumin = document.getElementById("SignupPersonal").value;
  const myphone =
    document.getElementById("PhoneNumber01").value +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;
  const site = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pass = document.getElementById("SignupPwd").value;

  axios.post("http://localhost:3000/users", {
    name: name,
    jumin: jumin,
    myphone: myphone,
    site: site,
    email: email,
    pass: pass,
  });
  console.log("회원 가입 이메일 전송");
};
