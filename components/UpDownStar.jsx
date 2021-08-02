import React from "react";

const UpDownStar = ({ state = false }) => {
  return (
    <>
      <i className="btn btn-link">
        {!state ? (
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chevron-compact-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
            />
          </svg>
        ) : (
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chevron-down"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        )}
      </i>
    </>
  );
};

export default UpDownStar;
