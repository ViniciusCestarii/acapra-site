interface AcapraLogoProps extends React.ComponentProps<"img"> {
  small?: boolean;
}

const AcapraLogo = ({ small, ...props }: AcapraLogoProps) => {
  return (
    <img
      {...props}
      src={small ? "/pequena-acrapra-logo.png" : "/acapra-logo.png"}
      alt="logo da acapra"
    />
  );
};

export default AcapraLogo;
