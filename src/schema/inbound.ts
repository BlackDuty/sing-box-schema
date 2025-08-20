import { z } from "zod";
import { AnyTLSInboundOptions } from "./protocols/anytls";
import { DirectInboundOptions } from "./protocols/direct";
import { HTTPInboundOptions } from "./protocols/http";
import { HysteriaInboundOptions } from "./protocols/hysteria";
import { Hysteria2InboundOptions } from "./protocols/hysteria2";
import { MixedInboundOptions } from "./protocols/mixed";
import { NaiveInboundOptions } from "./protocols/naive";
import { RedirectInboundOptions } from "./protocols/redirect";
import { ShadowsocksInboundOptions } from "./protocols/shadowsocks";
import { ShadowTLSInboundOptions } from "./protocols/shadowtls";
import { SocksInboundOptions } from "./protocols/socks";
import { TProxyInboundOptions } from "./protocols/tproxy";
import { TrojanInboundOptions } from "./protocols/trojan";
import { TUICInboundOptions } from "./protocols/tuic";
import { TunInboundOptions } from "./protocols/tun";
import { VLESSInboundOptions } from "./protocols/vless";
import { VMessInboundOptions } from "./protocols/vmess";

export const Inbound = z.discriminatedUnion("type", [
  DirectInboundOptions,
  MixedInboundOptions,
  SocksInboundOptions,
  HTTPInboundOptions,
  ShadowsocksInboundOptions,
  VMessInboundOptions,
  TrojanInboundOptions,
  NaiveInboundOptions,
  HysteriaInboundOptions,
  ShadowTLSInboundOptions,
  Hysteria2InboundOptions,
  AnyTLSInboundOptions,
  VLESSInboundOptions,
  TUICInboundOptions,
  TunInboundOptions,
  RedirectInboundOptions,
  TProxyInboundOptions,
  // Add other inbound types here
]);

export type Inbound = z.infer<typeof Inbound>;
