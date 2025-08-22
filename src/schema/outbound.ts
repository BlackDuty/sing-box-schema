import { z } from "zod";
import { SelectorOutbound } from "./groups/selector";
import { URLTestOutbound } from "./groups/urltest";
import { DirectOutboundOptions } from "./protocols/direct";
import { HTTPOutboundOptions } from "./protocols/http";
import { HysteriaOutboundOptions } from "./protocols/hysteria";
import { Hysteria2OutboundOptions } from "./protocols/hysteria2";
import { ShadowsocksOutboundOptions } from "./protocols/shadowsocks";
import { ShadowTLSOutboundOptions } from "./protocols/shadowtls";
import { SocksOutboundOptions } from "./protocols/socks";
import { SSHOutboundOptions } from "./protocols/ssh";
import { TorOutboundOptions } from "./protocols/tor";
import { TrojanOutboundOptions } from "./protocols/trojan";
import { TUICOutboundOptions } from "./protocols/tuic";
import { VLESSOutboundOptions } from "./protocols/vless";
import { VMessOutboundOptions } from "./protocols/vmess";
import { LegacyWireGuardOutboundOptions } from "./protocols/wireguard";

export const Outbound = z
  .discriminatedUnion("type", [
    DirectOutboundOptions,
    SocksOutboundOptions,
    HTTPOutboundOptions,
    ShadowsocksOutboundOptions,
    VMessOutboundOptions,
    TrojanOutboundOptions,
    LegacyWireGuardOutboundOptions,
    HysteriaOutboundOptions,
    ShadowTLSOutboundOptions,
    Hysteria2OutboundOptions,
    TUICOutboundOptions,
    VLESSOutboundOptions,
    SSHOutboundOptions,
    TorOutboundOptions,
    SelectorOutbound,
    URLTestOutbound,
    // Add other outbound types here
  ])
  .meta({
    id: "Outbound",
    title: "Outbound",
    title_zh: "出站",
  });

export type Outbound = z.infer<typeof Outbound>;
