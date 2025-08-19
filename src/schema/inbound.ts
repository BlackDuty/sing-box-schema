import { z } from "zod";
import { DirectInboundOptions } from "./protocols/direct";
import { HysteriaInboundOptions } from "./protocols/hysteria";
import { Hysteria2InboundOptions } from "./protocols/hysteria2";
import { ShadowsocksInboundOptions } from "./protocols/shadowsocks";
import { TrojanInboundOptions } from "./protocols/trojan";
import { TUICInboundOptions } from "./protocols/tuic";
import { VLESSInboundOptions } from "./protocols/vless";
import { VMessInboundOptions } from "./protocols/vmess";

export const Inbound = z.discriminatedUnion("type", [
  DirectInboundOptions,
  ShadowsocksInboundOptions,
  TrojanInboundOptions,
  VMessInboundOptions,
  HysteriaInboundOptions,
  Hysteria2InboundOptions,
  TUICInboundOptions,
  VLESSInboundOptions,
  // Add other inbound types here
]);

export type Inbound = z.infer<typeof Inbound>;
