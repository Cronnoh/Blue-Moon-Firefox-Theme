import sys
import math

def moonPhase(Y,M,D):
    currentJDN = JDN(Y,M,D)
    pastJDN = JDN(2020,1,24)
    age = (currentJDN - pastJDN) % 29.530588853
    # print(D, age)
    return phaseName(age)

def JDN(Y,M,D):
    if(M <= 2):
        M += 12
        Y -= 1
    A = Y//100
    B = A//4
    C = 2-A+B
    E = math.trunc(365.25*(Y+4716))
    F = math.trunc(30.6001*(M+1))
    return C+D+E+F-1524

def phaseName(age):
    if(age < 1):
        return "New Moon"
    if(age >= 1 and age < 7.383):
        return "Waxing Crescent"
    if(age >= 7.383 and age < 8.383):
        return "First Quarter"
    if(age >= 8.383 and age < 14.765):
        return "Waxing Gibbous"
    if(age >= 14.765 and age < 15.765):
        return "Full Moon"
    if(age >= 15.765 and age < 22.148):
        return "Waning Gibbous"
    if(age >= 22.148 and age < 23.148):
        return "Third Quarter"
    if(age >= 23.148):
        return "Waning Crescent"
    
for i in range(1,32):
    print(i, moonPhase(2020,int(sys.argv[1]),i))
