#!/bin/bash

# Server Performance Stats Analysis Script
# =========================================

echo "==============================================="
echo "        Server Performance Statistics"
echo "==============================================="

# 1. Total CPU Usage
echo "Total CPU Usage:"
cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
echo "CPU Usage: $cpu_usage%"

# 2. Total Memory Usage
echo -e "\nTotal Memory Usage:"
total_mem=$(free -m | awk '/Mem:/ {print $2}')
used_mem=$(free -m | awk '/Mem:/ {print $3}')
free_mem=$(free -m | awk '/Mem:/ {print $4}')
mem_usage=$(echo "scale=2; ($used_mem/$total_mem)*100" | bc)
echo "Total Memory: ${total_mem}MB"
echo "Used Memory: ${used_mem}MB"
echo "Free Memory: ${free_mem}MB"
echo "Memory Usage: $mem_usage%"

# 3. Total Disk Usage
echo -e "\nTotal Disk Usage:"
disk_usage=$(df -h --total | grep "total" | awk '{print $5}')
total_disk=$(df -h --total | grep "total" | awk '{print $2}')
used_disk=$(df -h --total | grep "total" | awk '{print $3}')
free_disk=$(df -h --total | grep "total" | awk '{print $4}')
echo "Total Disk: $total_disk"
echo "Used Disk: $used_disk"
echo "Free Disk: $free_disk"
echo "Disk Usage: $disk_usage"

# 4. Top 5 Processes by CPU Usage
echo -e "\nTop 5 Processes by CPU Usage:"
ps -eo pid,comm,%cpu --sort=-%cpu | head -n 6

# 5. Top 5 Processes by Memory Usage
echo -e "\nTop 5 Processes by Memory Usage:"
ps -eo pid,comm,%mem --sort=-%mem | head -n 6

# Stretch Goals
echo -e "\n==============================================="
echo "        Additional Server Information"
echo "==============================================="

# OS Version
echo -e "\nOperating System Version:"
os_version=$(cat /etc/os-release | grep "PRETTY_NAME" | cut -d '=' -f 2 | tr -d '"')
echo "$os_version"

# Uptime
echo -e "\nServer Uptime:"
uptime

# Load Average
echo -e "\nLoad Average (1, 5, 15 minutes):"
load_avg=$(uptime | awk -F'load average:' '{print $2}' | xargs)
echo "$load_avg"

# Logged-in Users
echo -e "\nLogged-In Users:"
who

# Failed Login Attempts (if /var/log/auth.log exists)
if [ -f /var/log/auth.log ]; then
    echo -e "\nFailed Login Attempts:"
    grep "Failed password" /var/log/auth.log | wc -l
else
    echo -e "\nFailed Login Attempts: Unable to determine (auth.log not found)"
fi

echo -e "\n==============================================="

