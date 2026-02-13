# MeshCore + BitChat Bridge v1.0.0

Bridge Bluetooth mesh (BitChat) and LoRa mesh (MeshCore) networks.

## Downloads

| File | Device | Description |
|------|--------|-------------|
| `heltec_v3_bitchat_bridge.zip` | Heltec LoRa32 V3 | BitChat bridge firmware (ESP32-S3) |
| `sensecap_solar_repeater.zip` | SenseCAP Solar P1 | LoRa mesh repeater firmware (nRF52840) |
| `bitchat-android.apk` | Android 8.0+ | BitChat Bluetooth mesh chat app |

## Flashing Instructions

### Heltec V3 (BitChat Bridge)

1. Extract `heltec_v3_bitchat_bridge.zip`
2. Use [ESP Web Flasher](https://esp.huhn.me/) or esptool:
   ```bash
   esptool.py --chip esp32-s3 write_flash 0x0 firmware-merged.bin
   ```
3. Hold BOOT + press RST to enter bootloader mode

**Zip contents:**
- `firmware-merged.bin` - Flash at 0x0 (recommended)
- `firmware.bin` - App only (flash at 0x10000)
- `bootloader.bin` - Bootloader (flash at 0x0)
- `partitions.bin` - Partition table (flash at 0x8000)

### SenseCAP Solar P1 (Repeater)

1. Connect via USB-C
2. Double-press RST quickly to enter DFU mode
3. Drag `firmware.uf2` onto the `XIAO-SENSE` drive

**Zip contents:**
- `firmware.uf2` - Drag-and-drop firmware
- `firmware.hex` - Alternative format

### BitChat Android App

1. Enable "Install from unknown sources" in Android settings
2. Install `bitchat-android.apk`
3. Grant Bluetooth and Location permissions
4. Join `#mesh` channel to communicate with MeshCore network

## Configuration

After flashing, configure devices via serial console or [MeshCore Web Config](https://config.meshcore.dev):

```
set freq 869.525    # EU (use 906.875 for US, 916.875 for AU/NZ)
set name "MyDevice"
reboot
```

**Important:** All devices must use the same frequency!

## What's Included

- **BitChat Bridge Firmware** - Based on [jooray/MeshCore-BitChat](https://github.com/jooray/MeshCore-BitChat)
- **MeshCore Repeater Firmware** - Standard [MeshCore](https://github.com/meshcore-dev/MeshCore) repeater build
- **BitChat Android** - From [permissionlesstech/bitchat-android](https://github.com/permissionlesstech/bitchat-android)

## How It Works

```
BitChat App (Phone) <--Bluetooth--> Heltec V3 Bridge <--LoRa--> MeshCore Network
```

Messages on the `#mesh` channel are relayed between BitChat (Bluetooth mesh) and MeshCore (LoRa mesh) networks.

## Support

- [MeshCore Discord](https://discord.gg/BMwCtwHj5V)
- [Setup Guide](https://mesh.virginiafreedom.tech)
