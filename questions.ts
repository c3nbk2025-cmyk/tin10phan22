import { Question } from './types';

export const LESSON_NAMES = {
  1: "Bài 26: Hàm trong Python",
  2: "Bài 27: Tham số của hàm",
  3: "Bài 28: Phạm vi của biến",
  4: "Bài 29: Nhận biết lỗi"
};

// Helper to create IDs
let sId = 1000;
const getSubId = () => ++sId;

export const QUIZ_QUESTIONS: Question[] = [
  // =========================================================
  // BÀI 26: HÀM TRONG PYTHON (8 Câu)
  // =========================================================
  {
    id: 1, lessonId: 1,
    scenario: "Quan sát định nghĩa hàm sau:\n\ndef chao_mung(ten):\n    print('Xin chào ' + ten)",
    items: [
      { id: getSubId(), text: "Từ khóa 'def' là bắt buộc để bắt đầu định nghĩa hàm.", isCorrect: true, explanation: "Đúng, 'def' là từ khóa định nghĩa hàm." },
      { id: getSubId(), text: "Tên hàm là 'chao_mung'.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Hàm này trả về một chuỗi kí tự.", isCorrect: false, explanation: "Sai, hàm không có 'return' nên trả về None." },
      { id: getSubId(), text: "Dấu hai chấm (:) sau danh sách tham số là tùy chọn.", isCorrect: false, explanation: "Sai, dấu hai chấm là bắt buộc." }
    ]
  },
  {
    id: 2, lessonId: 1,
    scenario: "Xét đoạn chương trình:\n\ndef tinh_tong(a, b):\n    return a + b\nprint(tinh_tong(3, 4))",
    items: [
      { id: getSubId(), text: "Chương trình sẽ in ra số 7.", isCorrect: true, explanation: "Đúng, 3 + 4 = 7." },
      { id: getSubId(), text: "Lệnh 'return' dùng để trả về kết quả cho hàm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Nếu bỏ lệnh print, hàm vẫn tính toán nhưng không hiện kết quả.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Biến a và b là biến toàn cục.", isCorrect: false, explanation: "Sai, a và b là tham số (biến cục bộ)." }
    ]
  },
  {
    id: 3, lessonId: 1,
    scenario: "Về quy tắc đặt tên hàm trong Python:",
    items: [
      { id: getSubId(), text: "Tên hàm có thể chứa khoảng trắng.", isCorrect: false, explanation: "Sai, không được chứa khoảng trắng." },
      { id: getSubId(), text: "Tên hàm không được bắt đầu bằng số.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Tên hàm có phân biệt chữ hoa và chữ thường.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Có thể dùng từ khóa của Python (như if, for) để đặt tên hàm.", isCorrect: false, explanation: "Sai, tránh trùng từ khóa." }
    ]
  },
  {
    id: 4, lessonId: 1,
    scenario: "Cho đoạn mã:\ndef f(x):\n    res = x**2\n    return res",
    items: [
      { id: getSubId(), text: "Hàm f dùng để tính bình phương của x.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Sau khi gặp lệnh return, các lệnh bên dưới (nếu có) vẫn được thực hiện.", isCorrect: false, explanation: "Sai, return kết thúc hàm ngay lập tức." },
      { id: getSubId(), text: "Biến res chỉ tồn tại bên trong hàm f.", isCorrect: true, explanation: "Đúng (biến cục bộ)." },
      { id: getSubId(), text: "Gọi f(3) sẽ trả về giá trị 6.", isCorrect: false, explanation: "Sai, 3^2 = 9." }
    ]
  },
  {
    id: 5, lessonId: 1,
    scenario: "Về việc sử dụng hàm có sẵn:",
    items: [
      { id: getSubId(), text: "Lệnh abs(-10) trả về -10.", isCorrect: false, explanation: "Sai, abs là giá trị tuyệt đối, trả về 10." },
      { id: getSubId(), text: "Lệnh len('Python') trả về 6.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Có thể gọi hàm lồng nhau như abs(len('abc') - 5).", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Hàm print() chỉ nhận được đúng 1 tham số.", isCorrect: false, explanation: "Sai, print nhận nhiều tham số." }
    ]
  },
  {
    id: 6, lessonId: 1,
    scenario: "Lợi ích của việc sử dụng hàm:",
    items: [
      { id: getSubId(), text: "Giúp code ngắn gọn, dễ đọc hơn.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Tránh việc viết lại cùng một đoạn mã nhiều lần.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Làm chương trình chạy nhanh hơn gấp đôi.", isCorrect: false, explanation: "Sai, hàm chủ yếu giúp tổ chức code, không tăng tốc độ xử lý." },
      { id: getSubId(), text: "Dễ dàng tìm và sửa lỗi logic.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 7, lessonId: 1,
    scenario: "Cấu trúc của hàm:",
    items: [
      { id: getSubId(), text: "Phần thân hàm phải được thụt lề so với dòng def.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Một hàm bắt buộc phải có ít nhất 1 tham số.", isCorrect: false, explanation: "Sai, hàm có thể không có tham số." },
      { id: getSubId(), text: "Một hàm bắt buộc phải có lệnh return.", isCorrect: false, explanation: "Sai, không bắt buộc." },
      { id: getSubId(), text: "Có thể định nghĩa hàm bên trong một hàm khác.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 8, lessonId: 1,
    scenario: "Thực thi hàm:\ndef hello():\n  print('Hi')",
    items: [
      { id: getSubId(), text: "Chương trình sẽ tự động in 'Hi' ngay khi chạy.", isCorrect: false, explanation: "Sai, phải gọi hàm hello() mới in." },
      { id: getSubId(), text: "Câu lệnh gọi hàm là hello().", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Câu lệnh gọi hàm là call hello.", isCorrect: false, explanation: "Sai cú pháp." },
      { id: getSubId(), text: "Hàm này không trả về giá trị nào (None).", isCorrect: true, explanation: "Đúng." }
    ]
  },

  // =========================================================
  // BÀI 27: THAM SỐ CỦA HÀM (8 Câu)
  // =========================================================
  {
    id: 9, lessonId: 2,
    scenario: "Hàm def power(base, exp=2): return base**exp",
    items: [
      { id: getSubId(), text: "exp là tham số có giá trị mặc định.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Gọi power(3) sẽ bị lỗi thiếu tham số.", isCorrect: false, explanation: "Sai, exp sẽ tự lấy giá trị 2." },
      { id: getSubId(), text: "Gọi power(3, 3) sẽ trả về 27.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "base là tham số bắt buộc.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 10, lessonId: 2,
    scenario: "Truyền tham số bằng tên (Keyword arguments):\ndef student(name, age): ...",
    items: [
      { id: getSubId(), text: "Có thể gọi student(age=16, name='Lan').", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Khi gọi bằng tên, thứ tự tham số không quan trọng.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Bắt buộc phải truyền đúng thứ tự định nghĩa.", isCorrect: false, explanation: "Sai, keyword arg cho phép đảo thứ tự." },
      { id: getSubId(), text: "Có thể kết hợp student('Lan', age=16).", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 11, lessonId: 2,
    scenario: "Tham số và Đối số:",
    items: [
      { id: getSubId(), text: "Tham số (Parameter) là biến được đặt tên trong lời khai báo hàm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Đối số (Argument) là giá trị thực sự truyền vào khi gọi hàm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Hai khái niệm này là hoàn toàn giống nhau.", isCorrect: false, explanation: "Sai." },
      { id: getSubId(), text: "Một hàm có thể không có tham số nhưng vẫn có đối số.", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 12, lessonId: 2,
    scenario: "Hàm thay đổi giá trị tham số (Mutable):\ndef them(L):\n  L.append(1)",
    items: [
      { id: getSubId(), text: "Nếu truyền một danh sách vào L, danh sách gốc sẽ bị thay đổi.", isCorrect: true, explanation: "Đúng, List là mutable." },
      { id: getSubId(), text: "Nếu truyền một số nguyên vào L, số nguyên gốc sẽ bị thay đổi.", isCorrect: false, explanation: "Sai, append không dùng cho số (và số là immutable)." },
      { id: getSubId(), text: "Hàm này không trả về danh sách mới.", isCorrect: true, explanation: "Đúng, nó sửa trực tiếp (in-place)." },
      { id: getSubId(), text: "Đây là cơ chế tham chiếu (pass by reference) của Python.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 13, lessonId: 2,
    scenario: "Lệnh print('A', 'B', 'C', sep='-')",
    items: [
      { id: getSubId(), text: "Kết quả in ra là: A-B-C", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "sep là tham số mặc định của hàm print.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Mặc định sep là dấu cách.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Lệnh này sẽ báo lỗi cú pháp.", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 14, lessonId: 2,
    scenario: "Định nghĩa: def f(a=1, b): ...",
    items: [
      { id: getSubId(), text: "Đoạn mã trên hợp lệ.", isCorrect: false, explanation: "Sai, tham số mặc định (a) không được đứng trước tham số không mặc định (b)." },
      { id: getSubId(), text: "Tham số mặc định luôn phải đặt ở cuối danh sách tham số.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Sửa thành def f(b, a=1): ... sẽ hợp lệ.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Lỗi này là lỗi Logic.", isCorrect: false, explanation: "Sai, đây là lỗi Cú pháp (SyntaxError)." }
    ]
  },
  {
    id: 15, lessonId: 2,
    scenario: "Hàm có số lượng tham số tùy ý (*args):",
    items: [
      { id: getSubId(), text: "Có thể định nghĩa hàm nhận vào số lượng đối số không xác định.", isCorrect: true, explanation: "Đúng (dùng *args)." },
      { id: getSubId(), text: "Các đối số tùy ý được lưu dưới dạng một Tuple.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Hàm print() là ví dụ của hàm có tham số tùy ý.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Cú pháp là dùng hai dấu sao (**).", isCorrect: false, explanation: "Sai, 2 dấu sao là cho keyword args (**kwargs)." }
    ]
  },
  {
    id: 16, lessonId: 2,
    scenario: "Truyền giá trị cho hàm:",
    items: [
      { id: getSubId(), text: "Có thể truyền biểu thức toán học làm đối số (vd: f(a+b)).", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Có thể truyền kết quả của hàm khác làm đối số.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Kiểu dữ liệu của đối số phải được khai báo trước.", isCorrect: false, explanation: "Sai, Python là ngôn ngữ kiểu động." },
      { id: getSubId(), text: "Số lượng đối số truyền vào phải khớp với tham số (trừ khi có mặc định).", isCorrect: true, explanation: "Đúng." }
    ]
  },

  // =========================================================
  // BÀI 28: PHẠM VI CỦA BIẾN (8 Câu)
  // =========================================================
  {
    id: 17, lessonId: 3,
    scenario: "Biến cục bộ (Local Variable):",
    items: [
      { id: getSubId(), text: "Được khai báo bên trong hàm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Có thể sử dụng ở bất cứ đâu trong chương trình.", isCorrect: false, explanation: "Sai, chỉ trong hàm đó." },
      { id: getSubId(), text: "Sẽ bị hủy khi hàm kết thúc thực thi.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Tham số của hàm cũng được coi là biến cục bộ.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 18, lessonId: 3,
    scenario: "Biến toàn cục (Global Variable):",
    items: [
      { id: getSubId(), text: "Được khai báo bên ngoài tất cả các hàm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Các hàm con có thể đọc giá trị biến toàn cục.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Hàm con có thể thay đổi giá trị biến toàn cục trực tiếp mà không cần từ khóa gì.", isCorrect: false, explanation: "Sai, cần keyword 'global'." },
      { id: getSubId(), text: "Tồn tại cho đến khi chương trình kết thúc.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 19, lessonId: 3,
    scenario: "Đoạn mã:\nx = 5\ndef f():\n  x = 10\n  print(x)",
    items: [
      { id: getSubId(), text: "Khi gọi f(), màn hình in ra 10.", isCorrect: true, explanation: "Đúng, ưu tiên biến cục bộ x=10." },
      { id: getSubId(), text: "Biến x bên trong hàm f là biến toàn cục.", isCorrect: false, explanation: "Sai, là biến cục bộ mới." },
      { id: getSubId(), text: "Giá trị x bên ngoài bị thay đổi thành 10.", isCorrect: false, explanation: "Sai." },
      { id: getSubId(), text: "Đây là hiện tượng che khuất biến (variable shadowing).", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 20, lessonId: 3,
    scenario: "Từ khóa 'global':",
    items: [
      { id: getSubId(), text: "Dùng để khai báo biến toàn cục bên trong hàm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Cú pháp là: global <tên_biến>", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Sau khi khai báo global, thay đổi biến trong hàm sẽ ảnh hưởng ra ngoài.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Có thể dùng global cho tham số hàm.", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 21, lessonId: 3,
    scenario: "Phạm vi trong khối lệnh (if, for, while):",
    items: [
      { id: getSubId(), text: "Trong Python, biến khai báo trong vòng lặp for vẫn tồn tại sau vòng lặp.", isCorrect: true, explanation: "Đúng (khác với C++)." },
      { id: getSubId(), text: "Biến khai báo trong khối if không thể dùng ở ngoài khối if.", isCorrect: false, explanation: "Sai, vẫn dùng được (nếu if được thực thi)." },
      { id: getSubId(), text: "Python có phạm vi khối (block scope) chặt chẽ như Java.", isCorrect: false, explanation: "Sai." },
      { id: getSubId(), text: "Biến trong hàm là phạm vi riêng biệt hoàn toàn.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 22, lessonId: 3,
    scenario: "Lỗi UnboundLocalError:",
    items: [
      { id: getSubId(), text: "Xảy ra khi cố gắng sử dụng biến cục bộ trước khi gán giá trị.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Xảy ra khi cố gắng sửa biến toàn cục trong hàm mà chưa khai báo global.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Là lỗi cú pháp.", isCorrect: false, explanation: "Sai, là lỗi runtime." },
      { id: getSubId(), text: "Python tự động sửa lỗi này.", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 23, lessonId: 3,
    scenario: "Truyền tham số là biến toàn cục:",
    items: [
      { id: getSubId(), text: "Giá trị của biến toàn cục được sao chép vào tham số hàm (với kiểu số, chuỗi).", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Tham số hàm độc lập với biến toàn cục truyền vào (với kiểu số).", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Tên tham số bắt buộc phải giống tên biến toàn cục.", isCorrect: false, explanation: "Sai, tên tùy ý." },
      { id: getSubId(), text: "Thay đổi tham số không ảnh hưởng biến toàn cục (kiểu số).", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 24, lessonId: 3,
    scenario: "Tổ chức chương trình:",
    items: [
      { id: getSubId(), text: "Nên hạn chế sử dụng quá nhiều biến toàn cục.", isCorrect: true, explanation: "Đúng, để tránh xung đột và khó debug." },
      { id: getSubId(), text: "Nên truyền dữ liệu qua tham số thay vì dùng global.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Biến cục bộ giúp tiết kiệm bộ nhớ hơn vì chúng được giải phóng sớm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Tất cả biến nên là toàn cục để dễ truy cập.", isCorrect: false, explanation: "Sai, thực hành xấu." }
    ]
  },

  // =========================================================
  // BÀI 29: NHẬN BIẾT LỖI (8 Câu)
  // =========================================================
  {
    id: 25, lessonId: 4,
    scenario: "Lỗi Cú pháp (Syntax Error):",
    items: [
      { id: getSubId(), text: "Viết thiếu dấu hai chấm (:) cuối lệnh if.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Viết sai chính tả từ khóa (vd: 'funtion' thay vì 'def').", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Chương trình vẫn chạy được một nửa.", isCorrect: false, explanation: "Sai, Syntax Error ngăn chương trình chạy ngay từ đầu." },
      { id: getSubId(), text: "Quên đóng ngoặc đơn print('hi'.", isCorrect: true, explanation: "Đúng." }
    ]
  },
  {
    id: 26, lessonId: 4,
    scenario: "Lỗi Ngoại lệ / Thực thi (Runtime Error):",
    items: [
      { id: getSubId(), text: "Xảy ra khi chương trình đang chạy.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Ví dụ: Chia một số cho 0.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Ví dụ: Truy cập phần tử thứ 10 của danh sách có 3 phần tử.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Ví dụ: Viết 1 + '1' (cộng số với chuỗi).", isCorrect: true, explanation: "Đúng (TypeError)." }
    ]
  },
  {
    id: 27, lessonId: 4,
    scenario: "Lỗi Ngữ nghĩa / Logic (Logical Error):",
    items: [
      { id: getSubId(), text: "Chương trình không báo lỗi nhưng ra kết quả sai.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Python không thể tự phát hiện lỗi này.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Ví dụ: Muốn tính trung bình cộng nhưng quên đóng ngoặc phép tổng trước khi chia.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Làm chương trình dừng đột ngột.", isCorrect: false, explanation: "Sai, chương trình vẫn chạy hết." }
    ]
  },
  {
    id: 28, lessonId: 4,
    scenario: "Sửa lỗi (Debugging):",
    items: [
      { id: getSubId(), text: "Đọc thông báo lỗi (Error Message) là bước quan trọng nhất.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Thông báo lỗi thường chỉ ra số dòng bị lỗi.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Nên dùng lệnh print() để kiểm tra giá trị biến khi chạy.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Nếu code sai, nên xóa hết viết lại từ đầu ngay.", isCorrect: false, explanation: "Sai, nên sửa dần dần." }
    ]
  },
  {
    id: 29, lessonId: 4,
    scenario: "Mã lỗi: NameError",
    items: [
      { id: getSubId(), text: "Thường do sử dụng biến chưa được khai báo.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Do viết sai chính tả tên biến.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Do dùng biến cục bộ ở ngoài hàm.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Do chia cho 0.", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 30, lessonId: 4,
    scenario: "Mã lỗi: TypeError",
    items: [
      { id: getSubId(), text: "Thực hiện phép toán trên hai kiểu dữ liệu không tương thích.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Ví dụ: 'Tuổi: ' + 16", isCorrect: true, explanation: "Đúng (cần ép kiểu 16 thành chuỗi)." },
      { id: getSubId(), text: "Ví dụ: len(123)", isCorrect: true, explanation: "Đúng (int không có len)." },
      { id: getSubId(), text: "Ví dụ: int('abc')", isCorrect: false, explanation: "Sai, đây là ValueError." }
    ]
  },
  {
    id: 31, lessonId: 4,
    scenario: "Mã lỗi: IndentationError",
    items: [
      { id: getSubId(), text: "Liên quan đến thụt lề dòng lệnh.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Thường gặp khi viết hàm, vòng lặp, câu lệnh if.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Dùng lẫn lộn Tab và Space có thể gây lỗi này.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Chương trình vẫn chạy được.", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 32, lessonId: 4,
    scenario: "Phân tích đoạn mã: for i in range(1, 10): ...",
    items: [
      { id: getSubId(), text: "Vòng lặp chạy từ 1 đến 10.", isCorrect: false, explanation: "Sai, chỉ chạy đến 9." },
      { id: getSubId(), text: "Vòng lặp chạy 9 lần.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Giá trị i cuối cùng là 9.", isCorrect: true, explanation: "Đúng." },
      { id: getSubId(), text: "Nếu muốn chạy đến 10, phải viết range(1, 11).", isCorrect: true, explanation: "Đúng." }
    ]
  }
];

// Reusing same structure for Wheel but keeping them simple as single-choice logically
// The Wheel component logic will treat these as "Questions"
export const WHEEL_QUESTIONS: Question[] = [
  {
    id: 101, lessonId: 5, scenario: "Vòng quay may mắn - Câu 1",
    items: [{ id: getSubId(), text: "Từ khóa 'def' dùng để ĐỊNH NGHĨA hàm (Đúng/Sai)?", isCorrect: true, explanation: "Đúng." }]
  },
  {
    id: 102, lessonId: 5, scenario: "Vòng quay may mắn - Câu 2",
    items: [{ id: getSubId(), text: "Biến trong hàm là biến toàn cục (Đúng/Sai)?", isCorrect: false, explanation: "Sai, là biến cục bộ." }]
  },
  {
    id: 103, lessonId: 5, scenario: "Vòng quay may mắn - Câu 3",
    items: [{ id: getSubId(), text: "Lỗi chia cho 0 là lỗi cú pháp (Đúng/Sai)?", isCorrect: false, explanation: "Sai, là lỗi runtime." }]
  },
  {
    id: 104, lessonId: 5, scenario: "Vòng quay may mắn - Câu 4",
    items: [{ id: getSubId(), text: "List có thể là tham số hàm (Đúng/Sai)?", isCorrect: true, explanation: "Đúng." }]
  },
  {
    id: 105, lessonId: 5, scenario: "Vòng quay may mắn - Câu 5",
    items: [{ id: getSubId(), text: "Hàm bắt buộc phải có return (Đúng/Sai)?", isCorrect: false, explanation: "Sai." }]
  },
  {
    id: 106, lessonId: 5, scenario: "Vòng quay may mắn - Câu 6",
    items: [{ id: getSubId(), text: "Python phân biệt hoa thường (Đúng/Sai)?", isCorrect: true, explanation: "Đúng." }]
  },
];
