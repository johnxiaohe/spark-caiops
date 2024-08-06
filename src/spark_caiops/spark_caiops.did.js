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
  const CaiVersion = IDL.Record({
    'id' : IDL.Nat,
    'cTime' : Time,
    'cPid' : IDL.Text,
    'desc' : IDL.Text,
    'name' : IDL.Text,
    'uPid' : IDL.Text,
    'wasm' : IDL.Vec(IDL.Nat8),
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
    'canisters' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
    'checkAdmin' : IDL.Func([], [IDL.Text], []),
    'delCanister' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'delCanisterByAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'delModule' : IDL.Func([IDL.Text], [], []),
    'initChilds' : IDL.Func([IDL.Text], [], []),
    'modules' : IDL.Func([], [IDL.Vec(CaiModule)], []),
    'setCaiDesc' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'setCaiTags' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [], []),
    'updateAllCais' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'updateTargetCais' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
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
