import { z } from "zod";
import { DirectInboundOptions } from "./protocols/direct";
import { HysteriaInboundOptions } from "./protocols/hysteria";
import { Hysteria2InboundOptions } from "./protocols/hysteria2";
import { ShadowsocksInboundOptions } from "./protocols/shadowsocks";
import { TrojanInboundOptions } from "./protocols/trojan";
import { TUICInboundOptions } from "./protocols/tuic";
import { VLESSInboundOptions } from "./protocols/vless";
import { VMessInboundOptions } from "./protocols/vmess";
import { SocksInboundOptions } from "./protocols/socks";
import { HTTPInboundOptions } from "./protocols/http";
import { MixedInboundOptions } from "./protocols/mixed";
import { NaiveInboundOptions } from "./protocols/naive";
import { ShadowTLSInboundOptions } from "./protocols/shadowtls";
import { AnyTLSInboundOptions } from "./protocols/anytls";
import { TunInboundOptions } from "./protocols/tun";
import { RedirectInboundOptions } from "./protocols/redirect";
import { TProxyInboundOptions } from "./protocols/tproxy";

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
