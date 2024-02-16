import { ToWords } from "to-words";

export function calculateDaysBetweenDates(startDate, endDate) {
  // Create Date objects for both dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const timeDifference = end - start;

  // Calculate the number of days by dividing the time difference by the number of milliseconds in a day
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Round the result to get the whole number of days
  return Math.round(daysDifference);
}

export const truncateDescription = (description, wordLimit) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

export const inWordCurrency = (amount) => {
  try {
    amount = parseFloat(amount);
    let words = toWords.convert(amount, { currency: true });
    return words;
  } catch (error) {
    return "NO NUMBER";
  }
};

export const inWordNumber = (amount) => {
  try {
    amount = parseFloat(amount);
    let words = toWords.convert(amount, { currency: false });
    return words;
  } catch (error) {
    return "NO NUMBER";
  }
};

// export const showToast = (type, text) => {
//   if (text !== "") {
//     if (type === "success") {
//       return toast.success(
//         { text },
//         {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         }
//       );
//     } else if (type === "error") {
//       toast.error(
//         { text },
//         {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         }
//       );
//     } else {
//       toast(
//         { text },
//         {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         }
//       );
//     }
//   }
// };
