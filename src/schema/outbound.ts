import { z } from "zod";
import { DirectOutboundOptions } from "./protocols/direct";
import { HysteriaOutboundOptions } from "./protocols/hysteria";
import { Hysteria2OutboundOptions } from "./protocols/hysteria2";
import { ShadowsocksOutboundOptions } from "./protocols/shadowsocks";
import { ShadowsocksROutboundOptions } from "./protocols/shadowsocksr";
import { SSHOutboundOptions } from "./protocols/ssh";
import { TorOutboundOptions } from "./protocols/tor";
import { TrojanOutboundOptions } from "./protocols/trojan";
import { TUICOutboundOptions } from "./protocols/tuic";
import { VLESSOutboundOptions } from "./protocols/vless";
import { VMessOutboundOptions } from "./protocols/vmess";
import { LegacyWireGuardOutboundOptions } from "./protocols/wireguard";
import { SocksOutboundOptions } from "./protocols/socks";
import { HTTPOutboundOptions } from "./protocols/http";
import { ShadowTLSOutboundOptions } from "./protocols/shadowtls";
import { AnyTLSOutboundOptions } from "./protocols/anytls";
import { SelectorOutboundSchema } from "./groups/selector";
import { URLTestOutboundSchema } from "./groups/urltest";

export const Outbound = z.discriminatedUnion("type", [
  DirectOutboundOptions,
  SocksOutboundOptions,
  HTTPOutboundOptions,
  ShadowsocksOutboundOptions,
  VMessOutboundOptions,
  TrojanOutboundOptions,
  LegacyWireGuardOutboundOptions,
  HysteriaOutboundOptions,
  ShadowTLSOutboundOptions,
  AnyTLSOutboundOptions,
  Hysteria2OutboundOptions,
  TUICOutboundOptions,
  VLESSOutboundOptions,
  ShadowsocksROutboundOptions,
  SSHOutboundOptions,
  TorOutboundOptions,
  SelectorOutboundSchema,
  URLTestOutboundSchema,
  // Add other outbound types here
]);

export type Outbound = z.infer<typeof Outbound>;
