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

export const Outbound = z.discriminatedUnion("type", [
  DirectOutboundOptions,
  ShadowsocksOutboundOptions,
  TrojanOutboundOptions,
  VMessOutboundOptions,
  HysteriaOutboundOptions,
  Hysteria2OutboundOptions,
  TUICOutboundOptions,
  VLESSOutboundOptions,
  LegacyWireGuardOutboundOptions,
  ShadowsocksROutboundOptions,
  SSHOutboundOptions,
  TorOutboundOptions,
  // Add other outbound types here
]);

export type Outbound = z.infer<typeof Outbound>;
