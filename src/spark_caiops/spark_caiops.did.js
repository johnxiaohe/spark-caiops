export const idlFactory = ({ IDL }) => {
  const CaiModule = IDL.Record({
    'desc' : IDL.Text,
    'name' : IDL.Text,
    'parentModule' : IDL.Text,
    'isChild' : IDL.Bool,
  });
  const Time = IDL.Int;
  const Member = IDL.Record({
    'pid' : IDL.Text,
    'cTime' : Time,
    'cPid' : IDL.Text,
    'name' : IDL.Text,
  });
  const Canister = IDL.Record({
    'cid' : IDL.Text,
    'owner' : IDL.Text,
    'version' : IDL.Text,
  });
  const CaisPageResp = IDL.Record({
    'data' : IDL.Vec(Canister),
    'page' : IDL.Int,
    'count' : IDL.Int,
    'size' : IDL.Int,
  });
  const CaiVersion = IDL.Record({
    'id' : IDL.Nat,
    'cTime' : Time,
    'cPid' : IDL.Text,
    'desc' : IDL.Text,
    'name' : IDL.Text,
    'size' : IDL.Nat,
    'uPid' : IDL.Text,
    'uTime' : Time,
  });
  return IDL.Service({
    'addAdmins' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addCanister' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addCanisterByAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'addOrUpdateModule' : IDL.Func([CaiModule], [], []),
    'addVersion' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
    'adminList' : IDL.Func([], [IDL.Vec(Member)], []),
    'canisters' : IDL.Func([IDL.Text, IDL.Nat, IDL.Nat], [CaisPageResp], []),
    'checkAdmin' : IDL.Func([], [IDL.Text], []),
    'delCanister' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'delCanisterByAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'delModule' : IDL.Func([IDL.Text], [], []),
    'getwasm' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Vec(IDL.Nat8)], []),
    'initChilds' : IDL.Func([IDL.Text], [], []),
    'modules' : IDL.Func([], [IDL.Vec(CaiModule)], []),
    'setCaiDesc' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'setCaiTags' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [], []),
    'updateAllCais' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    'updateTargetCais' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Vec(IDL.Text)],
        [IDL.Bool],
        [],
      ),
    'updateVersion' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'version' : IDL.Func([], [IDL.Text], []),
    'versions' : IDL.Func([IDL.Text], [IDL.Vec(CaiVersion)], []),
  });
};
export const init = ({ IDL }) => { return []; };
