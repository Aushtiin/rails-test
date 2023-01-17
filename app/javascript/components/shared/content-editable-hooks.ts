import React from "react";
import ReactContentEditable, { Props } from "react-contenteditable";

//https://github.com/lovasoa/react-contenteditable/issues/161

export const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: React.DependencyList,
): ((...args: T) => void) => {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, deps ?? [value]);

  const result = React.useCallback((...args: T) => {
    ref.current?.(...args);
  }, []);

  return result;
};

// export const ContentEditable = ({
//   ref,
//   onChange,
//   onInput,
//   onBlur,
//   onKeyPress,
//   onKeyDown,
//   ...props
// }: Props): JSX.Element => {
//   const onChangeRef = useRefCallback(onChange);
//   const onInputRef = useRefCallback(onInput);
//   const onBlurRef = useRefCallback(onBlur);
//   const onKeyPressRef = useRefCallback(onKeyPress);
//   const onKeyDownRef = useRefCallback(onKeyDown);

//   return (
//     <ReactContentEditable
//       {...props}
//       onChange={onChangeRef}
//       onInput={onInputRef}
//       onBlur={onBlurRef}
//       onKeyPress={onKeyPressRef}
//       onKeyDown={onKeyDownRef}
//     />
//   );
// };
