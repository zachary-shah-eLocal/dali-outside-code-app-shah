import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  SvgProps,
} from "react-native-svg";
const DiscoverIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#201D1C"
      fillRule="evenodd"
      d="M1.97 12.912c-.237.204-.539.292-1.022.292h-.2v-2.422h.2c.483 0 .774.082 1.023.296a1.23 1.23 0 0 1 0 1.835Zm-.873-2.75H0v3.663h1.09c.581 0 1-.132 1.367-.424a1.81 1.81 0 0 0 .695-1.407c0-1.082-.844-1.833-2.055-1.833ZM3.497 10.161h.744v3.664h-.744v-3.664ZM6.068 11.565c-.45-.157-.58-.262-.58-.46 0-.23.234-.405.557-.405.223 0 .408.086.604.295l.388-.488a1.711 1.711 0 0 0-1.124-.407c-.677 0-1.194.451-1.194 1.048 0 .506.24.763.941 1.007.293.098.442.164.517.21.15.092.224.224.224.377 0 .298-.247.517-.58.517a.887.887 0 0 1-.815-.49l-.482.446c.345.483.757.699 1.326.699.775 0 1.32-.497 1.32-1.204 0-.583-.252-.847-1.102-1.145ZM7.406 11.994c0 1.077.884 1.912 2.021 1.912.321 0 .596-.06.935-.213v-.842c-.3.287-.562.401-.902.401-.752 0-1.284-.52-1.284-1.263 0-.702.55-1.258 1.251-1.258.355 0 .625.12.935.412v-.841a1.978 1.978 0 0 0-.92-.224c-1.13 0-2.036.851-2.036 1.916ZM16.411 12.621l-1.02-2.46h-.815l1.623 3.757h.4l1.655-3.757h-.807l-1.036 2.46ZM18.593 13.825h2.118v-.62h-1.37v-.99h1.318v-.62H19.34v-.813h1.37v-.62h-2.117v3.663ZM22.17 11.846h-.217v-1.108h.229c.466 0 .716.187.716.544 0 .367-.25.564-.728.564Zm1.497-.604c0-.686-.492-1.08-1.354-1.08h-1.109v3.663h.749v-1.473h.097l1.031 1.473h.92l-1.206-1.544c.563-.11.872-.478.872-1.039Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M14.681 12.002c0 1.055-.893 1.91-1.996 1.91-1.102 0-1.995-.855-1.995-1.91s.893-1.91 1.995-1.91c1.103 0 1.996.855 1.996 1.91Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#b)"
      fillRule="evenodd"
      d="M14.681 12.002c0 1.055-.893 1.91-1.996 1.91-1.102 0-1.995-.855-1.995-1.91s.893-1.91 1.995-1.91c1.103 0 1.996.855 1.996 1.91Z"
      clipRule="evenodd"
    />
    <Defs>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-128.1 9.676 3.205) scale(2.62092 2.73884)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EA9D2C" stopOpacity={0} />
        <Stop offset={0.328} stopColor="#DF7624" stopOpacity={0} />
        <Stop offset={0.76} stopColor="#BF4B23" stopOpacity={0.75} />
        <Stop offset={1} stopColor="#7D3017" />
      </RadialGradient>
      <LinearGradient
        id="a"
        x1={11.461}
        x2={13.945}
        y1={10.453}
        y2={13.453}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E6772F" />
        <Stop offset={1} stopColor="#EA9D2C" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default DiscoverIcon;
