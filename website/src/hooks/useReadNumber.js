export const useReadNumber = () => {
  const uniTexts = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const scaleTexts = ["", "nghìn", "triệu", "tỷ", "nghìn", "triệu "];
  function readThreeDigits(number, hashScale = false) {
    const absNumber = Math.abs(number);
    const hundreds = Math.floor(absNumber / 100);
    const remainder = absNumber % 100;
    const tens = Math.floor(remainder / 10);
    const units = remainder % 10;

    let result = "";
    if (hundreds > 0) {
      result += uniTexts[hundreds] + " trăm ";
    } else if (hashScale && (tens > 0 || units > 0)) {
      result += "không trăm ";
    }

    if (tens > 1) {
      result += uniTexts[tens] + " mươi ";
    } else if (tens === 1) {
      result += "mười ";
    } else if (hashScale && units > 0) {
      result += "lẻ ";
    }

    if (tens > 1 && units === 1) {
      result += "mốt";
    } else if (tens > 1 && units === 5) {
      result += "lăm";
    } else if (units > 0) {
      result += uniTexts[units];
    }
    return result.trim();
  }
  function readNumber(number) {
    let index = 0;
    let result = "";
    let absNumber = Math.abs(number);
    if (!absNumber) {
      return "không đồng";
    }
    const lastIndex = Math.floor(String(absNumber).length / 3);
    do {
      const hashScale = index !== lastIndex;
      const threeDigits = readThreeDigits(absNumber % 1000, hashScale);
      if (threeDigits) {
        result = `${threeDigits} ${scaleTexts[index]} ${result}`;
      }
      absNumber = Math.floor(absNumber / 1000);
      index++;
    } while (absNumber > 0);
    result = (number < 0 ? "âm " : "") + (result.trim() + " đồng");
    return result[0].toUpperCase() + result.slice(1);
  }
  return readNumber;
};
