import serial
import serial.tools.list_ports
import time


class LoraSerial(serial.Serial):
    def __init__(self, com_device):
        super().__init__()
        # self.__initConfig__()
        self.port = com_device
        self.baudrate = 9600
        self.timeout = float("0.1")
        self.open()
        self.echoOff()

    def sendLine(self, str):
        self.clearBuffer()
        str = str + "\n"
        self.write(bytes(str.encode()))
        if str == "at+cslrm":
            time.sleep(5)
        else:
            time.sleep(0.1)  # [Important!] wait for 100 millisecond delay
        return self.getLine()

    # Read a line from serial & decode
    def getLine(self):
        line = self.readlines()
        return [
            x.decode(encoding="utf-8").replace("\r", "").replace("\n", "") for x in line
        ]

    def clearBuffer(self):
        self.flushInput()
        self.flushOutput()

    def echoOff(self):
        status = self.sendLine("at+echo=0")
        if "OK" in status:
            print("[Echo] off")
        else:
            print(f"{status = }[ERROR] Could not turn echo off.")


com_port_list = []
for i, port in enumerate(list(serial.tools.list_ports.comports())):
    com_port_list.append(port.device)
    if "FT230X" in port.description:
        ur_device = i
    print(i, port)
if not ur_device:
    ur_device = int(input("which device?"))
lora_module = LoraSerial(com_port_list[ur_device])
# FW Version
# print(lora_module.sendLine("at+slmr?"))
print(lora_module.sendLine("at+sgmr?"))
print(lora_module.sendLine("at+sgmm?"))
# SF status
# US915 0:SF10 1:SF9 2:SF8 3:SF7
# AS923 0:SF12 1:SF11 2:SF10 3:SF9 4:SF8 5:SF7
# print(lora_module.sendLine("at+cadr=?"))
print(lora_module.sendLine("at+cadr=3,5,FFFF,0,1"))
# Save ADR value
print(lora_module.sendLine("at+cslrm"))
print(lora_module.sendLine("at+cadr?"))
# Band
"""
at+cismb=?
+CISMB=<1-7>
1:EU868
2:US915
3:AS923
4:FULL
5:AU915
6:KR920
7:ISR915
8:RU864
9:IND865
OK

"""
# ismb_list = lora_module.sendLine("at+cismb=?")
# print(ismb_list)
# ismb_dict = {x.split(":")[0]: x.split(":")[1] for x in ismb_list[1:-2]}
# print(ismb_dict)
lora_module.clearBuffer()
print(lora_module.sendLine("at+cismb?"))
ismb_set = lora_module.sendLine("at+cismb?")[0].split(":")[1]
if ismb_set != "US915":
    print(lora_module.sendLine("at+cismb=2"))
print(f"ISMB:{ismb_set}")
# print(f"ISMB:{ismb_dict[ismb_set]}")
# ABP or OTAA
print(lora_module.sendLine("at+cmode=?"))
print(lora_module.sendLine("at+cmode=1"))
print(lora_module.sendLine("at+cmode?"))
# UpLink Ack
# print(lora_module.sendLine("at+csync=?"))
# print(lora_module.sendLine("at+csync?"))
# DEVEUI of OTAA Mode
# print(lora_module.sendLine("at+cdeveui?"))
# APPEUI of OTAA Mode
# print(lora_module.sendLine("at+cappkey?"))
#  DEVADDR of ABP Mode
cdevaddr = lora_module.sendLine("at+cdevaddr?")[0].split(" ")[0].split(":")[1]
print(cdevaddr)
addr = input(f"New DEVADDR:[{cdevaddr}]") or cdevaddr
if addr != cdevaddr:
    print(lora_module.sendLine(f"at+cdevaddr={addr}"))
print(lora_module.sendLine("at+cnwkskey=12345678901234567890123456789012"))
print(lora_module.sendLine("at+cnwkskey?"))
print(lora_module.sendLine("at+cappskey=12345678901234567890123456789012"))
print(lora_module.sendLine("at+cappskey?"))
# UpLink Freq List
# print(lora_module.sendLine("at+cqch?"))
print(lora_module.sendLine("at+cadr?"))
print(lora_module.sendLine('AT+dtx=88,"8863599990090000004041351404135140413514041351404135140413514041351404135140413514041351"'))
